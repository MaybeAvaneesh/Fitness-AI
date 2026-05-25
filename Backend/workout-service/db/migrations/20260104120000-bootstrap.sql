CREATE TABLE IF NOT EXISTS health(
    user_id int primary key,
    height_cm int,
    weight_kg int,
    age int,
    gender enum('male','female','other'),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS pain(
    user_id int primary key,
    muscle_pain_points json,
    joint_pain_points json,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS workout_splits(
    workout_split_id int auto_increment primary key,
    workout_split_name varchar(255) not null,
    workout_split_description text,
    workout_split_exercises json,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS user_workout_splits(
    user_id int primary key,
    workout_split_id int,
    foreign key (workout_split_id) references workout_splits(workout_split_id),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS goals(
    user_id int primary key,
    current_goals json,
    future_goals json,
    time_frame varchar(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS workout_history(
    history_id int auto_increment primary key,
    user_id int not null,
    intensity_level enum('low','medium','high'),
    workout_log json,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    index idx_user_created (user_id, created_at)
);