CREATE TABLE IF NOT EXISTS workouts(
    user_id int primary key,
    workout_out json
)

CREATE TABLE IF NOT EXISTS health(
    user_id int primary key,
    height_cm int,
    weight_kg int,
    age int,
    gender enum('male','female','other'),
)

CREATE TABLE IF NOT EXISTS pain(
    user_id int primary key,
    muscle_pain_points json
    joint_pain_points json
)

CREATE TABLE IF NOT EXISTS workout_splits(
    workout_split_id int auto_increment primary key,
    workout_split_name varchar(255) not null,
    workout_split_description text
    workout_split_exercises json
)

CREATE TABLE IF NOT EXISTS user_workout_splits(
    user_id int primary key,
    workout_split_id int,
    foreign key (workout_split_id) references workout_splits(workout_split_id)
)
