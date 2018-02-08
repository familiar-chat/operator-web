import config      from "api-common/config"
import React       from "react"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            token: undefined,
            subscribers: []
        })
    }

    componentDidMount() {
        ;(async _ => {
            let token = (
                await Promise.all(
                    [localStorage, sessionStorage]
                        .map(x => x.getItem("token"))
                        .filter(x => x)
                        .map(JSON.parse)
                        .map(x =>
                            x.type == "firebase" ? new Promise((resolve, reject) => {
                                let app = firebase.initializeApp(
                                    config.familiar.firebase,
                                    x.appName
                                )

                                let auth = firebase.auth(app)

                                let unsubscribe = auth.onAuthStateChanged(user => {
                                    unsubscribe()

                                    resolve(user && {
                                        app: app,
                                        type: "firebase",
                                        user: user
                                    })
                                })
                            })
                          :                        undefined
                        )
                )
            )
                .filter(x => x)

            this.setState({
                token: token && token[0]
            })

            for (let f of this.state.subscribers)
                f(token[0])
        })()
    }

    render() {
        let {
            render,
            ...props
        } = this.props

        return render({
            credentialApi: {
                createUserWithEmailAndPassword: async ({
                    email,
                    password
                }) => {
                    let f = firebase.initializeApp(config.familiar.firebase, Math.random().toString())

                    let x = await f.auth().createUserWithEmailAndPassword(email, password)

                    // todo check email
                    // await x.sendEmailVerification()

                    f.auth().signOut()

                    return x.uid
                },
                updatePassword: async ({
                    password,
                    newPassword
                }) => {
                    let user = firebase.auth(this.state.token.app).currentUser
                    
                    await user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(
                        user.email,
                        password
                    ))

                    await user.updatePassword(newPassword)

                    return true
                }
            },
            tokenApi: {
                create: async ({
                    staySignedIn,
                    email,
                    password
                }) => {
                    let app = (_ => {
                        while (true) {
                            try {
                                return firebase.initializeApp(
                                    config.familiar.firebase,
                                    Math.random().toString()
                                )
                            } catch (e) {
                            }
                        }
                    })()

                    let user = await (async _ => {
                        try {
                            return await firebase.auth(app).signInWithEmailAndPassword(
                                email,
                                password
                            )
                        } catch (e) {
                            app.delete()

                            throw e
                        }
                    })()

                    let storage = (
                        staySignedIn ? localStorage
                      :                sessionStorage
                    )
                    
                    storage.setItem(
                        "token",
                        JSON.stringify({
                            type: "firebase",
                            appName: app.name
                        })
                    )

                    await new Promise(resolve =>
                        this.setState(
                            {
                                token: ({
                                    app: app,
                                    type: "firebase",
                                    user: user
                                })
                            },
                            resolve
                        )
                    )

                    for (let f of this.state.subscribers)
                        f(this.state.token)
                },
                delete: _ => new Promise(async resolve => {

                    await firebase.auth(this.state.token.app).signOut()

                    localStorage.clear()
                    sessionStorage.clear()

                    this.setState(
                        {
                            token: undefined
                        },
                        async _ => {
                            for (let f of this.state.subscribers)
                                f(this.state.token)

                            //todo bug
                            location.reload()
                            resolve()
                        }
                    )
                }),
                read: _ => this.state.token,
                subscribe: f => new Promise(resolve =>
                    this.setState(
                        {
                            subscribers: this.state.subscribers.concat(f)
                        },
                        _ => resolve(f)
                    )
                ),
                unsubscribe: certificate => new Promise(resolve => {
                    let i = this.state.subscribers.findIndex(certificate)

                    if (i >= 0)
                        this.setState(
                            {
                                subscribers: this.state.subscribers.slice(0, i).concat(
                                    this.state.subscribers.slice(i)
                                )
                            },
                            resolve
                        )
                    else
                        resolve()
                })
            },
            ...props
        })
    }
}
