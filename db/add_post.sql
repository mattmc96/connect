INSERT INTO FEED( users_id,
                  content,
                  image_url,
                  created_at
                  VALUES ( $1, $2, $3, $4, TODAY() ) returning *;