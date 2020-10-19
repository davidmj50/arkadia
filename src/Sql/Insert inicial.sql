USE db_arkadia;
insert into tbl_categorias (Nombre_Categoria, Descripcion) values
('Linea blanca', 'Todos los productos de grandes para el hogar'),
('Celulares', 'Productos relacionados con tecnologia en telefonia movil'),
('Televisores', 'Todos los productos relacionados con televiosiones y proyeccion de imagenes'),
('Sonido', 'roductos relacionados con audio'),
('Video juegos', 'Todos los productos que poseen relacion con video juegos'),
('Hogar', 'Todos los productos de grandes para el hogar');

insert into tbl_rol (Nombre_Rol) values ('Administrador'),('Cliente');
INSERT INTO `db_arkadia`.`tbl_usuarios`
(`Id_Rol`,`Email`,`Password`,`Username`,`Nombre`,`Apellido`,`Direccion`,`Telefono`,`Fecha_Nacimiento`)
VALUES
(
1,'Admin@arkadia.com','admin','administrador','administrador','administrador','Calle falsa 123','el mio','1990-01-01');

select * from db_arkadia.tbl_usuarios;

delete from db_arkadia.tbl_categorias where id_categoria > 6;

select * from db_arkadia.tbl_categorias;

select * from db_arkadia.tbl_productos;

insert into db_arkadia.tbl_productos
(Id_Categoria, Nombre_Producto, Descripcion, Precio, Stock, Imagen) values
(2, 'Iphone 11 128 GB', 'Iphone XR 128 GB Pantalla 7 pulgadas camara de 32 Megapixeles', 300, 21, 'https://http2.mlstatic.com/celular-iphone-11-128gb-nuevo-100-original-y-sellada-D_NQ_NP_775680-MCO40352964318_012020-F.webp'),
(2, 'Celular IPhone SE 2020 64gb Chip A13', 'Celular iPhone SE 2020 64gb Chip A13 Pantalla 6.2 pulgadas camara de 8 Megapixeles', 250, 15, 'https://http2.mlstatic.com/celular-iphone-se-2020-64gb-chip-a13-D_NQ_NP_686896-MCO41906861053_052020-F.webp'),
(2, 'Samsung Galaxy A20 Negro 3gb Ram 32gb', 'SAMSUNG GALAXY A20 NEGRO 4G LTE 
Procesador octa core/ pantalla de 162.0mm(6.4",rectangulo completo) 
pantalla de 157.9mm(6.2 esquinas redondeadas) hd+ sAMOLED 
Camara Posterior Doble de 13mp + 5mp 13mp+5mp dual rear camera Camara frontal de 8MP
MEMORIA DE 32GB
Memoria RAM de 3GB
PESO 169gr
Dimensiones: 158.4x74.7x7.8mm', 200, 10, 'https://http2.mlstatic.com/samsung-galaxy-a20-negro-3gb-ram-32gb-memoria-D_NQ_NP_778787-MCO43159343608_082020-F.webp'),
(2, 'Celular Xiaomi Redmi Note 8 Global 64 Gb 4', 'Con un procesador Octa Core Qualcomm SnapDragon 665 acompañado de 4GB de RAM y 64GB. Pantalla IPS con resolución 1080p en conjunto a un notch tipo gota, ocupando un 90% de ratio de pantalla. Con una batería de 4000 mAH cargador de 10W aunque el teléfono es compatible con cargador de 18W. Sensor de huella trasero. Y lo más destacable son sus cámaras, cuenta con cuatro cámaras traseras, la principal de 48mp, un segundo sensor de 8mp el cual es un gran angular, un sensor de lente macro de 2pm y por ultimo un sensor de profundidad de 2mp. La cámara delantera tampoco se queda atrás con un sensor de 13mp con focal 2.0. Sin dudas con todas estas características, esto es lo mejor de lo mejor en la gama media.', 100, 20, 'https://http2.mlstatic.com/celular-xiaomi-redmi-note-8-global-64-gb-4-ram-garantia-12-m-D_NQ_NP_863741-MCO43226738860_082020-F.webp'),

(3, 'Televisor Tedge 50 Pulgadas Uhd Smart', 'Televisor Tedge 50 Pulgadas Uhd Smart', 170, 30, 'https://http2.mlstatic.com/televisor-tedge-50-pulgadas-uhd-smart-D_NQ_NP_896663-MCO43093241890_082020-F.webp'),
(3, 'Televisor Challenger Led 32t12 T2 Hd', 'Televisor Challenger Led 32t12 T2 Hd', 100, 12, 'https://http2.mlstatic.com/televisor-challenger-led-32t12-t2-hd-D_NQ_NP_901071-MCO41468662076_042020-F.webp'),
(3, 'Televisor Samsung 65'' Smart 4k Crystal', 'Televisor Samsung 65'' Smart 4k Crystal', 2000000, 300, 'https://http2.mlstatic.com/televisor-samsung-65-smart-4k-crystal-un65tu7000kxzl-D_NQ_NP_996348-MCO43685899630_102020-F.webp'),

(4, 'Iphone XS 64 GBTeatro En Casa Dvd Kalley 140w 5.1 Ch Hdmi Usb Karaoke Hd', 'Teatro En Casa Dvd Kalley 140w 5.1 Ch Hdmi Usb Karaoke Hd', 270, 6, ''),
(4, 'Equipo De Sonido Micro LG Lk72b 40w Nuevo Original 100%', 'Equipo De Sonido Micro LG Lk72b 40w Nuevo Original 100%', 125, 12, 'https://http2.mlstatic.com/equipo-de-sonido-micro-lg-lk72b-40w-nuevo-original-100-D_NQ_NP_799168-MCO42376252394_062020-F.webp'),
(4, 'Equipo De Sonido Para Pc Tv 40watts Bluetooth, Kws 616', 'Equipo De Sonido Para Pc Tv 40watts Bluetooth, Kws 616', 180, 9, 'https://http2.mlstatic.com/equipo-de-sonido-para-pc-tv-40watts-bluetooth-kws-616-D_NQ_NP_963949-MCO31038993961_062019-F.webp'),

(5, 'Consola Xbox One S 1tb', 'Consola Xbox One S 1tb', 300, 15, 'https://http2.mlstatic.com/consola-xbox-one-s-1tb-D_NQ_NP_872377-MCO43173660863_082020-F.webp'),
(5, 'Consola Ps4 1tb Fifa20 + 1 Control Ds4', 'Consola Ps4 1tb Fifa20 + 1 Control Ds4', 270, 15, 'https://http2.mlstatic.com/consola-ps4-1tb-fifa20-1-control-ds4-D_NQ_NP_806462-MCO43351393358_092020-F.webp'),
(5, 'Nintendo Switch Neón Blue And Red + Estuche. Nueva Y Sellada', 'Nintendo Switch Neón Blue And Red + Estuche. Nueva Y Sellada', 260, 15, 'https://http2.mlstatic.com/nintendo-switch-neon-blue-and-red-estuche-nueva-y-sellada-D_NQ_NP_762269-MCO32913381169_112019-F.webp');
