
INSERT INTO users (username, password, role) VALUES ('user', 'user', 'user'), ('admin', 'admin', 'admin');

INSERT INTO dishes (name, type, photo, description, allergies, prezzo) VALUES
-- Appetizers
('insalata di mare', 'appetizer', '/Images/appetizer/insalata_di_mare.jpg', 'cuttlefish, mussels, octopus and prawns', 'fish', 9.00),
('caprese con bufala', 'appetizer', '/Images/appetizer/caprese_con_bufala_dop.jpg', 'Vegetarian buffalo mozzarella, tomato, basil, oregano and balsamic vinegar', 'vegetarian', 8.00),
('tartare di salmone', 'appetizer', '/Images/appetizer/tartare_di_salmone.jpg', 'raw salmon', 'fish', 11.00),
('prosciutto crudo e melone', 'appetizer', '/Images/appetizer/prosciutto_crudo_e_melone.jpg', 'raw ham and melon', 'land', 8.50),
('hummus con verdure fresche', 'appetizer', '/Images/appetizer/hummus_con_verdure_fresche.jpg', 'cucumbers, celery, carrots, peppers and hummus', 'vegan', 7.50),
('frittelle di zucchine senza glutine', 'appetizer', '/Images/appetizer/frittelle_di_zucchine_senza_glutine.jpg', 'gluten free zucchini fritters', 'gluten free', 7.00),
('crostini con pate di fegatini', 'appetizer', '/Images/appetizer/crostini_con_pate_di_fegatini.jpg', 'Chicken livers and Bruschetta', 'land', 7.50),

-- Primi
('spaghetti alle vongole', 'primo', '/Images/primo/spaghetti_alle_vongole.jpg', 'Spaghetti with clams, garlic, parsley and olive oil', 'fish', 12.00),
('risotto al nero di seppia', 'primo', '/Images/primo/risotto_al_nero_di_seppia.jpg', 'Risotto with Cuttlefish ink and cuttlefish', 'fish', 13.50),
('lasagna alla bolognese', 'primo', '/Images/primo/lasagna_alla_bolognese.jpg', 'Classic meat lasagna with ragù, bechamel and parmesan', 'land', 11.00),
('tagliatelle al ragu di cinghiale', 'primo', '/Images/primo/tagliatelle_al_ragu_di_cinghiale.jpg', 'Tagliatelle with wild boar ragù', 'land', 13.00),
('gnocchi al pesto vegano', 'primo', '/Images/primo/gnocchi_al_pesto_vegano.jpg', 'Vegan potato gnocchi with basil pesto and cherry tomatoes', 'vegan', 10.00),
('ravioli ricotta e spinaci', 'primo', '/Images/primo/ravioli_ricotta_e_spinaci.jpg', 'Ravioli filled with ricotta and spinach in butter and sage', 'vegetarian', 10.50),
('pasta di mais con sugo alle verdure', 'primo', '/Images/primo/pasta_senza_glutine.jpg', 'Gluten-free corn pasta with fresh vegetable sauce', 'gluten free', 10.00),

-- Secondi
('grigliata mista di pesce', 'secondo', '/Images/secondo/grigliata_mista_di_pesce.jpg', 'Mixed grilled fish: prawns, squid, salmon', 'fish', 16.00),
('branzino al forno', 'secondo', '/Images/secondo/branzino_al_forno.jpg', 'Baked sea bass with herbs and potatoes', 'fish', 15.00),
('bistecca alla fiorentina', 'secondo', '/Images/secondo/bistecca_alla_fiorentina.jpg', 'T-bone steak Florentine style', 'land', 18.50),
('cotoletta alla milanese', 'secondo', '/Images/secondo/cotoletta_alla_milanese.jpg', 'Breaded veal cutlet Milanese style', 'land', 13.00),
('tofu alla griglia', 'secondo', '/Images/secondo/tofu_alla_griglia.jpg', 'Grilled tofu with seasonal vegetables', 'vegan', 11.00),
('parmigiana di melanzane', 'secondo', '/Images/secondo/parmigiana_di_melanzane.jpg', 'Eggplant parmigiana with tomato and mozzarella', 'vegetarian', 11.50),
('polpette di legumi senza glutine', 'secondo', '/Images/secondo/polpette_di_legumi.jpg', 'Gluten-free legume meatballs with curry sauce', 'gluten free', 10.50),

-- Pizze
('4 formaggi', 'pizza', '/Images/pizza/4_formaggi.jpg', 'Mozzarella, gorgonzola, fontina, parmigiano', 'vegetarian', 9.00),
('4 stagioni', 'pizza', '/Images/pizza/4_stagioni.jpg', 'Mozzarella, mushrooms, ham, artichokes, olives', 'land', 9.50),
('bufalina', 'pizza', '/Images/pizza/bufalina.jpg', 'Buffalo mozzarella, cherry tomatoes, basil', 'vegetarian', 9.00),
('capricciosa', 'pizza', '/Images/pizza/capricciosa.jpg', 'Tomato, mozzarella, ham, mushrooms, artichokes, olives', 'land', 9.50),
('diavola', 'pizza', '/Images/pizza/diavola.jpg', 'Tomato, mozzarella, spicy salami', 'land', 8.50),
('margherita', 'pizza', '/Images/pizza/margherita.jpg', 'Tomato, mozzarella, basil', 'vegetarian', 6.50),
('marinara', 'pizza', '/Images/pizza/marinara.jpg', 'Tomato, garlic, oregano, olive oil (no cheese)', 'vegan', 6.00),
('ortolana', 'pizza', '/Images/pizza/ortolana.jpg', 'Tomato, mozzarella, grilled vegetables', 'vegetarian', 8.00),
('prosciutto e funghi', 'pizza', '/Images/pizza/prosciutto_e_funghi.jpg', 'Tomato, mozzarella, ham, mushrooms', 'land', 8.50),
('pugliese', 'pizza', '/Images/pizza/pugliese.jpg', 'Tomato, mozzarella, red onions, olives', 'vegetarian', 8.00),
('romana', 'pizza', '/Images/pizza/romana.jpg', 'Tomato, mozzarella, anchovies, capers, oregano', 'fish', 8.00),
('speck e brie', 'pizza', '/Images/pizza/speck_e_brie.jpg', 'Mozzarella, speck, brie cheese', 'land', 9.50),
('tonno e cipolle', 'pizza', '/Images/pizza/tonno_e_cipolle.jpg', 'Tomato, mozzarella, tuna, onions', 'fish', 8.50),
('wurstel e patatine', 'pizza', '/Images/pizza/wurstel_e_patatine.jpg', 'Mozzarella, wurstel, fries', 'land', 8.50),

-- Contorni
('cicoria saltata', 'side', '/Images/side/cicoria_saltata.jpg', 'Sautéed chicory with garlic and chili', 'gluten free', 4.50),
('insalata mista', 'side', '/Images/side/insalata_mista.jpg', 'Mixed salad with lettuce, tomatoes, carrots, onions', 'gluten free', 4.00),
('insalata verde', 'side', '/Images/side/insalata_verde.jpg', 'Green salad with lettuce and extra virgin olive oil', 'gluten free', 3.50),
('patate al forno', 'side', '/Images/side/patate_al_forno.jpg', 'Oven-roasted potatoes with rosemary', 'gluten free', 4.50),
('patatine fritte', 'side', '/Images/side/patatine_fritte.jpg', 'French fries', 'gluten free', 4.50),
('verdure grigliate', 'side', '/Images/side/verdure_grigliate.jpg', 'Grilled vegetables: zucchini, peppers, eggplant', 'gluten free', 5.00);

INSERT INTO dishes (name, type, photo, prezzo) VALUES
('sparkling water 75cl', 'drink', '/Images/bibite/acqua_friz.jpg', 2.50),
('natural water 75cl', 'drink', '/Images/bibite/acqua_nat.jpg', 2.50),
('blond beer 66cl', 'drink', '/Images/bibite/birra.jpg', 5.00),
('coca cola 33cl', 'drink', '/Images/bibite/coca_cola.jpg', 3.50),
('coca cola zero 33cl', 'drink', '/Images/bibite/coca_cola_zero.jpg', 3.50),
('fanta 33cl', 'drink', '/Images/bibite/fanta.jpg', 3.50),
('sprite 33cl', 'drink', '/Images/bibite/sprite.jpg', 3.50),
('sprite zero 33cl', 'drink', '/Images/bibite/sprite_zero.jpg', 3.50),
('cold lemon tea 33cl', 'drink', '/Images/bibite/te_limone.jpg', 3.50),
('cold peach tea 33cl', 'drink', '/Images/bibite/te_pesca.jpg', 3.50),
('White Wine 1L', 'drink', '/Images/bibite/vino_bianco_casa.jpg', 12.00),
('Red Wine 1L', 'drink', '/Images/bibite/vino_rosso_casa.jpg', 12.00);

-- cart
insert into cart (user_id) VALUES (1), (2);
