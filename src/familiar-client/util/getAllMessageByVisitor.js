export default (
    visitor
) => 
    [
        ...visitor.general.messages.map(x => (x._name = "message", x)),
        ...visitor.general.received_messages.map(x => (x._name = "received_message", x)),
        ...visitor.general.trigger_messages.map(x => (x._name = "trigger_message", x))
    ].sort((a, b) => 
        a.created_date < b.created_date ? -1
      : a.created_date > b.created_date ? 1 
      : 0
    )
