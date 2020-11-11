INSERT INTO `Users` (`id`, `username`, `password`, `email`, `name`, `surname`, `birthday`, `accountCreation`, `idFirstLanguage`, `isBlocked`,`userStatus`) VALUES 
    (NULL, 'hnurska', 'hnurska', 'hanna.nurska@gmail.com', 'Hanna', 'Nurska', '1999-03-24', '2020-10-29','2', NULL, NULL),
    (NULL, 'cgrabowski', 'cgrabowski', 'c.grabowski13@gmail.com', 'Cezary', 'Grabowski', '1997-02-01', '2020-10-29','2', NULL, NULL),
    (NULL, 'agliszczynska', 'agliszczynska', 'agniieszka.gliszczynska@gmail.com', 'Agnieszka', 'Gliszczyńska', '1998-04-19', '2020-10-29','2', NULL, NULL),
    (NULL, 'wkuchta', 'wkuchta', 'ooi8@wp.pl', 'Wojciech', 'Kuchta', '1997-06-23', '2020-10-29','2', NULL, NULL),
    (NULL, 'testniedoslyszacy', 'testniedoslyszacy', '', 'Niedoslyszacy', 'Test', '2020-10-29', '2020-10-29','2', NULL, NULL),
    (NULL, 'testniedowidzacy', 'testniedowidzacy', '', 'Niedowidzacy', 'Test', '2020-10-29', '2020-10-29','2', NULL, NULL),
    (NULL, 'testdaltonista', 'testdaltonista', '', 'Daltonista', 'Test', '2020-10-29', '2020-10-29','2', NULL, NULL),
    (NULL, 'testzablokowany', 'testzablokowany', '', 'Zablokowany', 'Test', '2020-10-29', '2020-10-29','2', TRUE, NULL);

INSERT INTO `Languages` (`id`, `code`, `name`, `info`) VALUES 
    (NULL, 'eng', 'English', 'Język Angielski'),
    (NULL, 'pol', 'Polski', 'Język Polski');

INSERT INTO `ExerciseSets` (`id`,`name`, `info`, `idCreator`, `setCreation`, `idBaseLanguage`, `idLearnLanguage`,`isWordSet`, `popularity`, `ifVideo`, `ifAudio`, `ifPicture`) VALUES 
    (NULL, 'Ptaki', 'Ptaki Polski', '1','2020-10-29', '1', '2', TRUE, '1', NULL, NULL, NULL),
    (NULL, 'Sporty', 'Sporty', '2','2020-10-29', '1','2', TRUE, '1', NULL, NULL, NULL),
    (NULL, 'Proste zdania', 'Proste zdania', '2','2020-10-29', '1','2', TRUE, NULL, NULL, NULL, NULL);

INSERT INTO `TemplatesInfo` (`id`,`name`, `info`) VALUES 
    (NULL, 'WordExerciseTemplate', 'Template zawiera parę: słowo - tłumaczenie'),
    (NULL, 'FillSentenceExerciseTemplate', 'Template zawiera: prawą storne zdania, lewąstrone zdania, oraz słowo do uzupełnienia, wraz z możliwością dodania słów mylących.'),
    (NULL, 'TranslateSentenceExerciseTemplate', 'Template zawiera: zdanie oraz jego tłumaczenie.');

INSERT INTO `SetsExercises` (`id`,`idSet`, `idTemplate`, `idExercise`) VALUES 
    (NULL, '1', '1', '1'),
    (NULL, '1', '1', '2'),
    (NULL, '1', '1', '3'),
    (NULL, '1', '1', '4'),
    (NULL, '1', '1', '5'),
    (NULL, '1', '1', '6'),
    (NULL, '1', '1', '7'),
    (NULL, '1', '1', '8'),
    (NULL, '1', '1', '9'),
    (NULL, '1', '1', '10'),
    (NULL, '2', '1', '11'),
    (NULL, '2', '1', '12'),
    (NULL, '2', '1', '13'),
    (NULL, '2', '1', '14'),
    (NULL, '2', '1', '15'),
    (NULL, '2', '1', '16'),
    (NULL, '2', '1', '17'),
    (NULL, '2', '1', '18'),
    (NULL, '2', '1', '19'),
    (NULL, '2', '1', '20'),
    (NULL, '3', '2', '1'),
    (NULL, '3', '2', '2'),
    (NULL, '3', '3', '1'),
    (NULL, '3', '3', '2');

INSERT INTO `WordExerciseTemplate` (`id`, `idSet`, `word`, `translation`, `videoPath`, `audioPath`, `picturePath`) VALUES 
    (NULL, '1', 'Bird', 'Ptak',NULL,NULL,NULL), 
    (NULL, '1', 'Chicken', 'Kurczak',NULL,NULL,NULL), 
    (NULL, '1', 'Duck', 'Kaczka',NULL,NULL,NULL), 
    (NULL, '1', 'Goose', 'Gęś',NULL,NULL,NULL), 
    (NULL, '1', 'Stork', 'Bocian',NULL,NULL,NULL), 
    (NULL, '1', 'Turkey', 'Indyk',NULL,NULL,NULL), 
    (NULL, '1', 'Crow', 'Wrona',NULL,NULL,NULL), 
    (NULL, '1', 'Eagle', 'Orzeł',NULL,NULL,NULL),
    (NULL, '1', 'Pigeon', 'Gołąb',NULL,NULL,NULL), 
    (NULL, '1', 'Swan', 'Łabędź',NULL,NULL,NULL),
    (NULL, '2', 'Sumo', 'Sumo',NULL,NULL,NULL),
    (NULL, '2', 'Volleyball', 'Siatkówka',NULL,NULL,NULL),
    (NULL, '2', 'Ice hockey', 'Hokej',NULL,NULL,NULL),
    (NULL, '2', 'Handball', 'Piłka ręczna',NULL,NULL,NULL),
    (NULL, '2', 'Swimming', 'Pływanie',NULL,NULL,NULL),
    (NULL, '2', 'Hurdle race', 'Bieg przez płotki',NULL,NULL,NULL),
    (NULL, '2', 'Running', 'Bieganie',NULL,NULL,NULL),
    (NULL, '2', 'Badminton', 'Badminton',NULL,NULL,NULL),
    (NULL, '2', 'Archery', 'Łucznictwo',NULL,NULL,NULL),
    (NULL, '2', 'Aerobics', 'Aerobik',NULL,NULL,NULL) ;

INSERT INTO `FillSentenceExerciseTemplate` (`id`,`idSet`, `leftPartOfSentence`, `wordToFill`,`rightPartOfSentence`,`videoPath`, `audioPath`, `picturePath`) VALUES 
    (NULL, '3', 'My name', 'is','Czarek.', NULL, NULL, NULL),
    (NULL, '3', 'The sky', 'is','blue.', NULL, NULL, NULL);

INSERT INTO `IncorrectWordsFillSentenceExerciseTemplate` (`id`,`word`, `idFillSentenceExerciseTemplate`) VALUES 
    (NULL, 'are', '1'),
    (NULL, 'the', '1'),
    (NULL, 'a', '1'),
    (NULL, 'an', '2'),
    (NULL, 'are', '2');

INSERT INTO `TranslateSentenceExerciseTemplate` (`id`,`idSet`, `oryginalSentence`, `translatedSentence`,`videoPath`, `audioPath`, `picturePath`) VALUES 
    (NULL, '3', 'The sky is blue', 'Niebo jest niebieskie.', NULL, NULL, NULL),
    (NULL, '3', 'The world is beautiful.', 'Świat jest piękny.', NULL, NULL, NULL);

INSERT INTO `FavouriteSets` (`id`,`idSet`, `idUser`) VALUES 
    (NULL, '1', '1'),
    (NULL, '1', '2'),
    (NULL, '2', '1'),
    (NULL, '2', '3');

INSERT INTO `SetsTags` (`id`,`idSet`, `tag`) VALUES 
    (NULL, '1', 'zwierzeta'),
    (NULL, '1', 'ptaki'),
    (NULL, '2', 'sport'),
    (NULL, '2', 'gry'),
    (NULL, '3', 'proste');

INSERT INTO `UserPreferences` (`id`,`idUser`, `idColorSets`, `fontSize`,`noSound`) VALUES 
    (NULL, '1', '1', NULL,NULL),
    (NULL, '2', '1', NULL,NULL),
    (NULL, '3', '1', NULL,NULL),
    (NULL, '4', '1', NULL,NULL),
    (NULL, '5', '1', NULL,TRUE),
    (NULL, '6', '1', '12',NULL),
    (NULL, '7', '2', NULL,NULL),
    (NULL, '8', '1', NULL,NULL);

INSERT INTO `GuiColors` (`id`,`color1`, `color2`, `color3`,`color4`,`color5`) VALUES 
    (NULL, 'FFFFFFh', NULL, NULL,NULL,NULL),
    (NULL, 'FFFFFFh', NULL, NULL,NULL,NULL);