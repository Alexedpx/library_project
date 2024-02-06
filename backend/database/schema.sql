DROP DATABASE IF EXISTS library;

CREATE DATABASE library;

USE library;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, pseudo VARCHAR(80) NOT NULL, email VARCHAR(80) NOT NULL, hashed_password VARCHAR(255) NOT NULL, avatar VARCHAR(80) NOT NULL, style_favoris VARCHAR(80) NULL
);

CREATE TABLE book (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, image VARCHAR(255) NULL, titre VARCHAR(80) NOT NULL, auteur VARCHAR(80) NOT NULL, nombre_pages INT NOT NULL, date DATE NOT NULL, categorie VARCHAR(80) NOT NULL, description VARCHAR(750) NULL, commentaire VARCHAR(255) NULL, statut ENUM('Non lu', 'En cours', 'Lu') NOT NULL DEFAULT 'Non lu', user_id INT, CONSTRAINT fk_book_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE favoris (
    user_id INT, book_id INT, CONSTRAINT pk_favoris_book_user PRIMARY KEY (user_id, book_id), CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT fk_favorite_book FOREIGN KEY (book_id) REFERENCES book (id) ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO
    user (
        pseudo, email, hashed_password, avatar, style_favoris
    )

VALUES ( 

    "Alexe",
    "alexe@mail.com",
    "$argon2id$v=19$m=19456,t=2,p=1$gWObmHZS7rgNOWKBgjk6XA$+LgiRcEh1raCasFsV9bqRXahgiNdZdW1ww+v2WOP8Mc",
    "/images/avatar.jpg",
    "Thriller"
);

INSERT INTO book ( 

image,
titre,
auteur,
nombre_pages,
date,
categorie,
description,
commentaire,
statut,
user_id

) 

VALUES (
    "/images/harrypotter_1.jpg",
"Harry Potter a l’école des sorciers",
"JK Rowling",
320,
"1997-06-26",
"Fantastique",
"Le jour de ses onze ans, Harry Potter, un orphelin élevé par un oncle et une tante qui le détestent, voit son existence bouleversée. Un géant vient le chercher pour l'emmener à Poudlard, une école de sorcellerie ! Voler en balai, jeter des sorts, combattre les trolls : Harry se révèle un sorcier doué. Mais un mystère entoure sa naissance et l'effroyable V., le mage dont personne n'ose prononcer le nom.",


"Le livre de mon enfance!", "Lu", 1

), 

(
    "/images/harrypotter_2.jpg",
"Harry Potter & la chambre des secrets",
"JK Rowling",
368,
"1998-07-02",
"Fantastique",
"Harry Potter fait une deuxième rentrée fracassante en voiture volante à l'école des sorciers. Cette deuxième année ne s'annonce pas de tout repos... surtout depuis qu'une étrange malédiction s'est abattue sur les élèves. Entre les cours de potion magique, les matchs de Quidditch et les combats de mauvais sorts, Harry trouvera-t-il le temps de percer le mystère de la Chambre des Secrets ? Un livre magique pour sorciers et sorcières confirmés !",
"",
"Non lu",
1


), 

 (
    "/images/thomas_pesquet.jpg",
"Ma vie sans gravité",
"Thomas Pesquet",
416,
"2023-10-18",
"Biographie",
"Comment devient-on le plus jeune Français à partir vers la Station spatiale ? Comment passer de sa Normandie natale aux pas de tir de Baïkonour et de Cap Canaveral ? Pour la première fois, Thomas Pesquet se raconte sans détour, dans un récit très personnel aussi drôle que surprenant. Il nous entraîne des coulisses de l'école des astronautes jusqu'au frisson du décollage, partage le quotidien de ses 396 jours à bord de l'ISS et l'émerveillement de découvrir, flottant dans le vide intersidéral, notre planète si fragile. Une autobiographie aux allures de roman d'aventures, dont le héros est devenu l'une des personnalités préférées des Français.",
"",
"Lu",
1


), 

 (
    "/images/javascript.jpg",
"Javascript en 30 minutes",
"Timothy T. Stanley",
61,
"2022-12-16",
"Scolaire",
"Ce livre vous montre tout ce qu'il faut savoir sur la programmation JavaScript de manière simple sans que vous soyez submergé par trop d'informations.",
"",
"Lu",
1


), 

(
    "/images/holly.jpg",
"Holly",
"Stephen King",
568,
"2024-02-28",
"Thriller",
"Dans une jolie maison victorienne d'une petite ville du Midwest, Emily et Rodney Harris, anciens professeurs d'université, mènent une vie de retraités actifs. Malgré leur grand âge, les années semblent n'avoir pas avoir de prise sur eux.À quelques pas de leur demeure, on a retrouvé le vélo de Bonnie Dahl, récemment disparue. Elle n'est pas la première à se volatiliser dans ce périmètre. Chose étrange : à chaque fois, il s'agit de jeunes gens.Quels secrets inavouables cachent les murs tapissés de livres des époux Harris ?",
"",
"Non lu",
1


), 

 (
    "/images/silmarillion.jpg",
"Le Silmarillion",
"JRR Tolkien",
640,
"1977-09-15",
"Fantastique",
"Les Premiers Jours du Monde étaient à peine passés quand Fëanor, le plus doué des Elfes, créa les trois Silmarils. Ces bijoux renfermaient la Lumière des Deux Arbres de Valinor. Morgoth, le premier Prince de la Nuit, était encore sur la Terre du Milieu, et il fut fâché d'apprendre que la Lumière allait se perpétuer. Alors il enleva les Silmarils, les fit sertir dans son diadème et garder dans la forteresse d'Angband. Les Elfes prirent les armes pour reprendre les joyaux et ce fut la première de toutes les guerres. Longtemps, longtemps après, lors de la Guerre de l'Anneau, Elrond et Galadriel en parlaient encore.",
"",
"Lu",
1


), 

(
    "/images/Interstellar.jpg",
"Interstellar",
"Christopher Nolan",
400,
"2014-11-14",
"Science-Fiction",
"In Interstellar a group of explorers make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
"",
"Non lu",
1


);