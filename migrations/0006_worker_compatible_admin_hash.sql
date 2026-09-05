UPDATE admin_users
SET password_hash='pbkdf2_sha256$100000$xPH5BOhohQiBJ7Zufeif3A==$cliNuopeT8NhZ07RD37r33d8ObDuf/AWppibzc6q4YY=',
    updated_at=CURRENT_TIMESTAMP
WHERE email='admin@gitex.local';
