INSERT INTO CALENDAR(cal_id, reminder, team_name, DATE, HOUR)
VALUES ( $1, $2, $3, $4, $5 ) returning *;