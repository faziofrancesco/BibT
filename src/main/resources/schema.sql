
CREATE TABLE book (
  id_book INT AUTO_INCREMENT  PRIMARY KEY,
  author VARCHAR(250) NULL,
  title VARCHAR(250)NULL ,
  publisher VARCHAR(250)NULL ,
  address VARCHAR (250)NULL,
  year INTEGER (10)NULL

);
CREATE TABLE article (
  id_article INT AUTO_INCREMENT  PRIMARY KEY,
  author VARCHAR(250)NULL ,
  title VARCHAR(250) NULL,
  journal VARCHAR(250) NULL,
  year INTEGER (10)NULL,
  volume VARCHAR (250)NULL,
  number VARCHAR (250)NULL,
  pages VARCHAR (250)NULL

);
CREATE TABLE inproceedings (
  id_inproceedings INT AUTO_INCREMENT  PRIMARY KEY,
  author VARCHAR(250) NULL,
  title VARCHAR(250)NULL ,
  booktitle VARCHAR(250) NULL,
  series VARCHAR (250)NULL,
  year INTEGER (10)NULL,
  pages VARCHAR (250)NULL,
  publisher VARCHAR (250)NULL,
  address VARCHAR (250)NULL

);
CREATE TABLE misc (
  id_misc INT AUTO_INCREMENT  PRIMARY KEY,
  title VARCHAR(250) NULL ,
  author VARCHAR(250) NULL ,
  howpublished VARCHAR(250)NULL ,
  year INTEGER (10)NULL,
  note VARCHAR(250) NULL

);
