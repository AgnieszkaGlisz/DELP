--tworzenie bazy danych
CREATE DATABASE Delp CHARACTER SET utf8 COLLATE utf8_general_ci;	

--tworzenie tabeli Users przechowującej podstawowe dane o uzytkowniku
CREATE TABLE Users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password CHAR(32) NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    surname VARCHAR(255),
    birthday DATE,
    accountCreation DATE,
    idFirstLanguage INT DEFAULT 1,
    isBlocked BOOLEAN,
    userStatus INT,
    PRIMARY KEY (id)
);

--tworzenie tabeli ExerciseSets przechowujacej podstawowe informacje o zestawach zadan
CREATE TABLE ExerciseSets(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    info VARCHAR(1000),
    idCreator INT NOT NULL,
    setCreation DATE,
    idBaseLanguage INT,
    idLearnLanguage INT,
    isWordSet BOOLEAN,
    popularity INT DEFAULT 1,
    ifVideo BOOLEAN,
    ifAudio BOOLEAN,
    ifPicture BOOLEAN,
    PRIMARY KEY (id)
);
ALTER TABLE `ExerciseSets`
ADD deleted INT
ALTER TABLE `ExerciseSets`
ADD numberOfExercises INT

--tworzenie tabeli SetsExercises by połączyć zestaw z odpowiednim zadaniem 
CREATE TABLE SetsExercises(
    id INT NOT NULL AUTO_INCREMENT,
    idSet INT NOT NULL,
    idTemplate INT,
    idExercise INT,
    PRIMARY KEY (id)
);
ALTER TABLE `SetsExercises`
ADD exerciseOrder INT

--stworzenie tabeli WordExerciseTemplate by przechować wszystkie zadania tego typu
CREATE TABLE WordExerciseTemplate(
    id INT NOT NULL AUTO_INCREMENT,
    idSet INT NOT NULL,
    word VARCHAR(255),
    translation VARCHAR(255),
    videoPath VARCHAR(255),
    audioPath VARCHAR(255),
    picturePath VARCHAR(255),
    PRIMARY KEY (id)
);

<<<<<<< HEAD

--stworzenie tabeli FillSentanceExerciseTemplate by przechować wszystkie zadania tego typu
=======
--stworzenie tabeli FillSentenceExerciseTemplate by przechować wszystkie zadania tego typu
>>>>>>> origin/front-view-container
CREATE TABLE FillSentenceExerciseTemplate(
    id INT NOT NULL AUTO_INCREMENT,
    idSet INT NOT NULL,
    leftPartOfSentence VARCHAR(1000),
    wordToFill VARCHAR(255),
    rightPartOfSentence VARCHAR(1000),
    videoPath VARCHAR(255),
    audioPath VARCHAR(255),
    picturePath VARCHAR(255),
    PRIMARY KEY (id)
);

--stworzenie tabeli IncorrectWordsFillSentenceExerciseTemplate by przechować wszystkie dodatkowe słowa do zadania
CREATE TABLE IncorrectWordsFillSentenceExerciseTemplate(
    id INT NOT NULL AUTO_INCREMENT,
    word VARCHAR(255),
    idFillSentenceExerciseTemplate INT NOT NULL,
    PRIMARY KEY (id)
);

--stworzenie tabeli TranslateSentenceExerciseTemplate by przechować wszystkie zadania tego typu
CREATE TABLE TranslateSentenceExerciseTemplate(
    id INT NOT NULL AUTO_INCREMENT,
    idSet INT NOT NULL,
    oryginalSentence VARCHAR(1000),
    translatedSentence VARCHAR(1000),
    videoPath VARCHAR(255),
    audioPath VARCHAR(255),
    picturePath VARCHAR(255),
    PRIMARY KEY (id)
);

--tworzenie tabeli FavouriteSets by przechowywać informacje o ulubionych zestawach poszczególnych uzytkownikow
CREATE TABLE FavouriteSets(
    id INT NOT NULL AUTO_INCREMENT,
    idSet INT NOT NULL,
    idUser INT NOT NULL,
    PRIMARY KEY (id)
);

--tworzenie tabeli TemplatesInfo przechowującej informacje o rodzajach zadań jakie obsluguje aplikacja
CREATE TABLE TemplatesInfo(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    info VARCHAR(1000),
    PRIMARY KEY (id)
);

--tworzenie tabeli SetsTags przechowującej tagi dla każdego z zestawów
CREATE TABLE SetsTags(
    id INT NOT NULL AUTO_INCREMENT,
    idSet INT NOT NULL,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

--tworzenie tabeli UserPreferences przechowującej tagi dla każdego z zestawów
CREATE TABLE UserPreferences(
    id INT NOT NULL AUTO_INCREMENT,
    idUser INT NOT NULL,
    idColorSets INT,
    fontSize INT,
    noSound BOOLEAN,
    PRIMARY KEY (id)
);
ALTER TABLE `UserPreferences`
ADD noSight BOOLEAN

--tworzenie tabeli Languages przechowujacej dane o wszystkich mozliwych jezykach do uzycia przez uzytkownikow
CREATE TABLE Languages(
    id INT NOT NULL AUTO_INCREMENT,
    code VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    info VARCHAR(1000),
    PRIMARY KEY (id)
);

--tworzenie tabeli GuiColors przechowujacej dane o wszystkich trybach kolorystycznych do wybory z bazy(zwykły, bardziej kontrastowy, nocny)
CREATE TABLE GuiColors(
    id INT NOT NULL AUTO_INCREMENT,
    color1 VARCHAR(10),
    color2 VARCHAR(10),
    color3 VARCHAR(10),
    color4 VARCHAR(10),
    color5 VARCHAR(10),
    PRIMARY KEY (id)
);
