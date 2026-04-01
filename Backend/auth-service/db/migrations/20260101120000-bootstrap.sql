CREATE TABLE IF NOT EXISTS users(
    id int auto_increment primary key,
    email varchar(255) not null unique,
    phone_number varchar(20) not null unique,
    password varchar(255) not null,
    is_active tiny_int(1) default 1,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
)

