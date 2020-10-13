 
const getAllEvents = async (db) => {
    const events = await db.get_all_events()
    return events
}


module.exports => {
    getEvents: async (req, res) => {
        const db = req.app.get('db')
        const events = await getAllEvents(db)
        res.status(200).send(events)
    },
    addEvent: async (req, res) =>{
        const db = req.app.get('db')
        const { id } = req.session.user
        const { reminder, team_name, date, hour } = req.body
        await db.create_event([id, reminder, team_name, date, hour])
        const events = await getAllEvents(db)
        res.status(200).send(events)
},
deleteEvent: async(req, res) => {
    const db = req.app.get('db')

    const {cal_id} = req.params
    await db.delete_event([event_id])
    const events = await getAllEvents(db)
    res.status(200).send(events)
},
}