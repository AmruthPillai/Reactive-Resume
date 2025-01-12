-- This migration normalizes the username and email fields for all users,
-- ensuring that they are stored in lowercase.
UPDATE "User"
SET username = LOWER(username),
    email = LOWER(email);

