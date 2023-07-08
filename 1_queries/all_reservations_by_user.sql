SELECT reservations.id, title, start_date, cost_per_night, avg(rating) as average_rating
FROM reservations
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE reservations.guest_id = 1
GROUP BY reservations.id,title, start_date,cost_per_night
ORDER BY start_date;