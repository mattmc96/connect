SELECT f.id,
       u.email,
       u.profile_pic f.users_id AS author_id,
       f.content,
       f.created_at,
       f.image_url
FROM feed f
     JOIN users u ON f.users_id = u.id