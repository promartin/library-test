DROP TABLE IF EXISTS rent;

DROP TABLE IF EXISTS book;

DROP TABLE IF EXISTS user;

INSERT INTO
    user (username, password, employee)
VALUES (
        'john.doe',
        'password123',
        true
    ),
    (
        'jane.smith',
        'securepass',
        false
    ),
    (
        'michael.jones',
        'mike1234',
        true
    ),
    (
        'emily.johnson',
        'emily2024',
        false
    ),
    (
        'daniel.brown',
        'danpass',
        true
    ),
    (
        'olivia.davis',
        'olivia!987',
        false
    ),
    (
        'william.miller',
        'will2024',
        true
    ),
    (
        'sophia.wilson',
        'sophia321',
        false
    ),
    (
        'james.moore',
        'jamesxyz',
        true
    ),
    (
        'isabella.taylor',
        'bella789',
        false
    );