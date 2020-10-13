SELECT c.id,
       c.reminder,
       c.cal_id,
       c.team_name,
       c.date,
       c.hour,
       u.email,
FROM calendar c
     JOIN users u ON c.cal_id = u.id