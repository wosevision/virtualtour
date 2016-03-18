angular.module('services', [])
	.factory('LocationService', function($http){
		// icon markers
		var iconPixel = 'https://uoit.ca/maps/img/map/markerpixel.png';
		var iconMarker = {
			url: 'https://uoit.ca/maps/img/map/pinKiosk.png'//,
			//anchor: [15,75],
		}
		var iconMarkerSmall = {
			url: 'https://uoit.ca/maps/img/map/pinKioskSmall.png'//,
			//anchor: [11,51],
		}
		var iconFood = 'https://uoit.ca/maps/img/map/iconfood.png',
		    iconResidence = 'https://uoit.ca/maps/img/map/iconresidence.png',
		    iconOutdoor = 'https://uoit.ca/maps/img/map/iconoutdoor.png',
		    iconParking = 'https://uoit.ca/maps/img/map/iconparking.png',
		    iconParkingVisitor = 'https://uoit.ca/maps/img/map/iconparkingvisitor.png',
		    iconParkingPaystation = 'https://uoit.ca/maps/img/map/iconparkingpaystation.png',
		    iconParkingAccessible = 'https://uoit.ca/maps/img/map/iconaccessible.png',
		    iconParkingCarpool = 'https://uoit.ca/maps/img/map/iconparkingcarpool.png',
		    iconService = 'https://uoit.ca/maps/img/map/iconservice.png',
		    iconServiceEmergency = 'https://uoit.ca/maps/img/map/iconserviceemergency.png',
		    imagePath = 'https://uoit.ca/maps/img/buildings/thumbs/';
		var poi = [
				{	category: 'Buildings',
					label: 'building',
					locations: [
						{	name: 'ACE', 
							label:'ACE',
							code: 'ace',	
							desc: "<p>ACE is the first commercial automotive research, development and innovation centre of its kind in the world. This is a place where industry, researchers and students collaborate to create, test and validate paradigm-shifting innovations with a focus on bringing them to market as rapidly as possible. ACE has an array of testing equipment, including one of the largest and most sophisticated climatic wind tunnels on the planet.</p>"
									+"<p>ACE enables knowledge and practical experience to combine more effectively and to create synergies across disciplines and skill sets, leading to a stronger manufacturing economy in Canada. At the same time, it helps educate and train the skilled personnel needed to take the automotive industry and manufacturing to a new level of competitiveness and success.</p>", 
							img: 'ace.jpg',
							icon: iconPixel,
							coords: [43.94565,-78.899121],
							coordsEntrance: [43.945627,-78.898769],						  
						},
						{ 	name: 'Business and IT Building', 
							label:'Business and IT Building (UB)',
							code: 'ub',	
							desc: "<p>Referred on campus by many as UB, the 9,700-square-metre Business and Information Technology Building offers our students innovative research laboratories, modern lecture halls, a large cafÃ© and student lounge areas. It is the home of the Faculty of Business and Information Technology.</p>"
									+"<p>Like other UOIT academic buildings, a portion of UB's rooftop is 'green', just one of UOITâ€™s many environmentally friendly features.</p>", 
							img: 'ub.jpg',
							icon: iconPixel,
							coords: [43.945156,-78.896095],
							coordsEntrance: [43.945156,-78.896095],
						},
						{ 	name: 'Campus Corners', 
							label:'Campus Corners',				 
							code: 'cc',	
							desc: "<p>Located on the southeast corner of Conlin Road and Simcoe Street, Campus Corners is the home of the UOIT Office of Graduate Studies (OGS) (main floor). </p>"
									+"<p>OGS administers the strategic growth, development and regulations pertaining to our graduate degree programs. It represents the academic unit at Academic Council and to internal and external individuals and groups.</p>"
									+"<p>The building also serves as office space for Finance and Administration; Human Resources; Information Technology Services; Payroll; Purchasing; the Office of Research Services; the Office of Technology Transfer and Commercialization; and the Office of Campus Infrastructure and Sustainability.</p>"
									+"<p>A number of non-university commercial services are also located in the Campus Corners plaza, including a Shoppers Drug Mart, Subway restaurant, and TD Canada Trust bank.</p>", 
							img: 'cc.jpg',
							icon: iconPixel,
							coords: [43.947813,-78.895119],
							coordsEntrance: [43.947813,-78.895119],
						},
						{ 	name: 'Campus Ice Centre',  
							label:'Campus Ice Centre',
							code: 'cic',	
							desc: "<p>The Campus Ice Centre features two NHL-size ice pads with seating for 500 and 200 people, 10 large change rooms, a sports pro shop, a community room, a full-service restaurant (Shagwells on the Ridge) and a snack bar. The Campus Ice Centre also offers catering services.</p>", 
							img: 'cic.jpg',
							icon: iconPixel,
							coords: [43.950675,-78.89823],
							coordsEntrance: [43.950675,-78.89823],
						},
						{ 	name: 'Campus Recreation and Wellness Centre', 
							label:'Campus Recreation and Wellness Centre', 
							code: 'crwc',	
							desc: "<p>Serving students, faculty and staff from UOIT as well as Durham College, the Campus Recreation and Wellness Centreâ€™s (CRWC) modern facilities provide a wide variety of fitness and recreational opportunities.</p>"
									+"<p>The 8,400-square-metre CRWC includes a large triple gymnasium, squash courts, an indoor track, The FLEX fitness centre (cardio and weight machines), training rooms, and a dance studio. The CRWC, which welcomes more than 10,000 users each month, also houses the Campus Health Centreâ€™s medical clinic and various services ranging from acupuncture and athletic therapy to massage therapy and counselling. There is also a full-service Lovell Drugs pharmacy on site. </p>", 
							img: 'crwc.jpg',
							icon: iconPixel,
							coords: [43.944024, -78.898665],
							coordsEntrance: [43.94443,-78.898527],
						},
						{ 	name: 'Campus Tennis Centre',  
							label:'Campus Tennis Centre',
							code: 'ctc',	
							desc: "<p>UOITâ€™s Campus Tennis Centre is a superior year-round facility that offers beginner, recreational and competitive players with access to six clay courts. The facility features a clubhouse with a pro shop and change room facilities with showers.</p>", 
							icon: iconPixel,
							coords: [43.948597,-78.899057],
							coordsEntrance: [43.948597,-78.899057],
						},
						{ 	name: 'Clean Energy Research Laboratory',  
							label:'Clean Energy Research Laboratory',
							code: 'cerl',	
							desc: "<p>The Clean Energy Research Laboratory (CERL) is used to conduct research on hydrogen production, heat engines and nanotechnology. Researchers are working on the world's first lab-scale demonstration of a copper-chlorine cycle for thermochemical water splitting and nuclear hydrogen production. Hydrogen is a clean energy carrier of the future and potentially major solution to the problem of climate change.</p>"
									+"<p>Research in CERL is conducted on new types of heat engines for cleaner generation of electricity, including a Marnoch heat engine, and nanotechnology devices for waste heat recovery in automotive, computer, mobile device and other applications.</p>", 
							img: 'cerl.jpg',
							icon: iconPixel,
							coords: [43.946574,-78.900285],
							coordsEntrance: [43.946574,-78.900285],
						},
						{ 	name: 'Energy Systems and Nuclear Science Research Centre', 
							label:'Energy Systems and Nuclear Science Research Centre (ERC)', 
							code: 'erc',	
							desc: "<p>The Energy Systems and Nuclear Science Research Centre (ERC) is a 9,290-square-metre facility that houses UOIT's unique-in-Canada energy science and engineering programs, including courses in wind, solar, hydrogen, hydraulic, geothermal and nuclear energy. </p>"
									+"<p>The ERC enables leading-edge research in the clean and green energies and technologies required by future economies. It also promotes Canada's entrepreneurial advantage through public-private research and commercialization partnerships. </p>"
									+"<p>UOIT is a member of the University Network of Excellence in Nuclear Engineering, which includes many educational institutions and key industry partners such as Atomic Energy of Canada Limited, Bruce Power, Cameco and Ontario Power Generation.</p>",
							img: 'erc.jpg',
							icon: iconPixel,
							coords: [43.94565,-78.896283],
							coordsEntrance: [43.94565,-78.896283],
						},
						{ 	name: 'North Oshawa Library',  
							label:'North Oshawa Library',
							code: 'lib',	
							desc: "<p>The award-winning North Oshawa Library is designed to incorporate leading-edge technology while maintaining the comfort of a traditional library. Students enjoy 6,800 square metres of total learning space over four floors, including the Dixon-Alger Fireside Reading Room with a two-storey glass rotunda overlooking Polonsky Commons.</p>"
									+"<p>The basement of North Oshawa Library serves as a seasonal laptop distribution centre (during high-traffic periods). </p>"
									+"<p>The North Oshawa Library features:</p>"
									+"<ul>"
									+"<li>Individual and collaborative learning spaces</li>"
									+"<li>Seating capacity of 500</li>"
									+"<li>A reading room and fireplace</li>"
									+"<li>160,000-volume book capacity</li>"
									+"<li>160 computer workstations</li>"
									+"<li>Wired and wireless environments</li>"
									+"<li>Features to assist students with visual and learning disabilities</li>"
									+"<li>A Starbucks cafÃ©</li>"
									+"</ul>"
									+"<p>The Campus Libraries system also operates the Education Library, and the Social Science and Humanities Library at UOITâ€™s downtown Oshawa location; as well as the Library at Durham Collegeâ€™s Whitby Campus.</p>",
							img: 'lib.jpg',
							icon: iconPixel,			
							coords: [43.945878,-78.897276],
							coordsEntrance: [43.94572,-78.897407]
						},
						{ 	name: 'Ontario Power Generation Engineering Building',  
							label:'Ontario Power Generation Engineering Building',
							code: 'opg',	
							desc: "<p>The Ontario Power Generation (OPG) Engineering Buildingâ€™s 3,700 square metres of space house state-of-the-art labs, academic offices and other learning facilities.</p>"
									+"<p>This three-storey buildingâ€™s features include:</p>"
									+"<ul>"
									+"<li>A rapid prototyping and manufacturing lab</li>"
									+"<li>A combustion and engines lab</li>"
									+"<li>Mechatronics lab</li>"
									+"<li>An emerging energy systems lab with solar, wind, hydrogen and fuel-cell technology</li>"
									+"</ul>"
									+"<p>The building's equipment was carefully selected to educate students about technologies of the future and the building itself has become a showcase for the delivery of engineering education.</p>",
							img: 'opg.jpg',
							icon: iconPixel,				
							coords: [43.945828,-78.898359],
							coordsEntrance: [43.945828,-78.898359]
						},
						{ 	name: 'Gordon Willey Building - A Wing',  
							label:'A Wing',
							code: 'gwa',	
							desc: "<p>Housing innovative laboratories and classrooms, the A-Wing sits in the heart of the Gordon Willey Building, named after Durham Collegeâ€™s first president. The Campus Bookstore is located here, along with the Print Shop. The A-Wing is also home to Durham Collegeâ€™s unique dental labs and its main administrative offices. </p>",	
							icon: iconPixel,				
							coords: [43.943731,-78.896712],
							coordsEntrance: [43.943731,-78.896712]
						},
						{ 	name: 'Gordon Willey Building - B Wing',  
							label:'B Wing',
							code: 'gwb',	
							desc: "<p>The B-Wing of the Gordon Willey building provides a variety of food options such as the Marketplace Food Court and a full-service Tim Hortons. The Office of Parking Services and a campus lost and found are located in the main lobby. The B-Wing also houses a number of classrooms and learning facilities for students at Durham College.</p>",	
							icon: iconPixel,				
							coords: [43.943515,-78.896986],
							coordsEntrance: [43.943515,-78.896986]
						},
						{ 	name: 'Gordon Willey Building - C Wing',  
							label:'C Wing',
							code: 'gwc',	
							desc: "<p>The C-Wing features classrooms, laboratories, a 162-seat lecture theatre, a photography development area and offices for the Durham College Schools of: Business, IT and Management; Interdisciplinary Studies and Employment Services; and Media, Art and Design.</p>",	
							icon: iconPixel,				
							coords: [43.943387,-78.897651],
							coordsEntrance: [43.943387,-78.897651]
						},
						{ 	name: 'Gordon Willey Building - D Wing',  
							label:'D Wing',
							code: 'gwd',	
							desc: "<p></p>",	
							icon: iconPixel,				
							coords: [43.943263,-78.89808],
							coordsEntrance: [43.943263,-78.89808]
						},
						{ 	name: 'Gordon Willey Building - F Wing',  
							label:'F Wing',
							code: 'gwf',	
							desc: "<p>This building houses a 1,250-square-metre double gymnasium used primarily by the Durham College Lordsâ€™ varsity basketball, volleyball and indoor soccer programs, as well for community events hosted by UOIT and Durham College. The F-Wing also houses offices for the Durham College School of Justice and Emergency Services.</p>",	
							icon: iconPixel,				
							coords: [43.944299,-78.897852], //43.944291,-78.897581
							coordsEntrance: [43.944291,-78.897581]
						},

						{ 	name: 'Gordon Willey Building - G Wing',  
							label:'G Wing',
							code: 'gwg',	
							desc: "<p></p>",	
							icon: iconPixel,				
							coords: [43.944243, -78.898187],
							coordsEntrance: [43.944248,-78.898102]
						},

						{ 	name: 'Gordon Willey Building - H Wing',  
							label:'H Wing',
							code: 'gwh',	
							desc: "<p>The H-Wing of the Gordon Willey building is home to the Integrated Manufacturing Centre â€“ an educational facility shared by UOIT and Durham College (DC) students, and manufacturers from Durham Region in key high-tech areas of automation, manufacturing and applied research. H-Wing also houses DCâ€™s rapid prototyping and computer-aided design labs, offices for DCâ€™s School of Science and Engineering Technology and the DC Office of the Vice-President, Academic.</p>",	
							img: 'hw.jpg',
							icon: iconPixel,				
							coords: [43.944001,-78.89572],
							coordsEntrance: [43.944001,-78.89572]
						},
						{ 	name: 'Gordon Willey Building - I Wing',  
							label:'I Wing',
							code: 'gwi',	
							desc: "<p>The Gordon Willey Buildingâ€™s 1,000-square-metre I-Wing features access to classrooms and lecture theatres, and a large galleria for hosting special campus events. In addition, it provides work and social space for students.</p>",	
							icon: iconPixel,				
							coords: [43.943874,-78.896208],
							coordsEntrance: [43.943874,-78.896208]
						},
						{ 	name: 'Gordon Willey Building - Justice Wing',  
							label:'Justice Wing',
							code: 'gwj',	
							desc: "<p>The 1,200-square-metre Justice Wing, serves as the core of Durham Collegeâ€™s justice programs. The Justice Wing is home to the Durham Regional Police Service's Learning Centre and houses a conference room and mock courtroom.</p>",	
							img: 'jw.jpg',
							icon: iconPixel,				
							coords: [43.944577,-78.897608],
							coordsEntrance: [43.944577,-78.897608]
						},
						{ 	name: 'Gordon Willey Building - L Wing',  
							label:'L Wing',
							code: 'gwl',	
							desc: "<p>The 3,900-square-metre L-Wing offers a number of classrooms, a lecture theatre and Mac computer labs, a camera and print shop, where students can sign out manual, digital and video cameras and print black and white and colour documents. The campus newspaper, The Chronicle, is produced by Durham College Journalism students in this wing.</p>",	
							icon: iconPixel,				
							coords: [43.942812,-78.897935],
							coordsEntrance: [43.942812,-78.897935]
						},
						{	name: 'J Wings',  
							label:'J Wings',
							code: 'j',	
							desc: "<p>The J-Wings (two) are extensions of the Simcoe Building, featuring:</p>"
									+"<ul>"
									+"<li>Classroom space</li>"
									+"<li>Computer Science teaching lab (Faculty of Science)</li>"
									+"<li>Graduate student study space</li>"
									+"<li>Kinesiology teaching labs (Faculty of Health Sciences)</li>"
									+"<li>Research labs (Faculty of Business and Information Technology)</li>"
									+"<li>Prayer rooms</li>"
									+"</ul>", 	
							icon: iconPixel,				
							coords: [43.945141,-78.894524],
							coordsEntrance: [43.945341,-78.894755],
						},
						{	name: 'Science Building',  
							label:'Science Building (UA)',
							code: 'ua',	
							desc: "<p>The 20,000-square-metre Science Building is home to the Faculty of Science and the Faculty of Health Sciences. It includes a 250-seat lecture theatre; chemistry, physics and biology labs; and a student study hall, among many other student-friendly features.</p>"
									+"<p>This four-storey building also houses:</p>"
									+"<ul>"
									+"<li>Two beautiful atria</li>"
									+"<li>11 lecture halls and five classrooms</li>"
									+"<li>Research laboratories</li>"
									+"<li>Meeting rooms</li>"
									+"<li>Faculty and staff offices</li>"
									+"<li>A study hall overlooking Polonsky Commons</li>"
									+"<li>A 20,000-litre Aquatic Toxicology wet lab.</li>"					
									+"</ul>",
							img: 'ua.jpg',
							icon: iconPixel,				
							coords: [43.944584, -78.896433],
							coordsEntrance: [43.944776,-78.895827],
						},
						{	name: 'Simcoe Building',  
							label:'Simcoe Building',
						  	code: 'sim',	
						  	desc: "<p>The Simcoe Building is home to the Gaming Laboratory, a hub of 30 state-of-the art workstations used by students in the Game Development and Entrepreneurship program. A full-body motion capture system enables students to capture their own motion data for their projects and a laser scanner creates highly detailed 3D reference models of real-world objects. A variety of 3D visualization systems are available for students to explore the latest trends of 3D displays including new input methodologies, full-body gesture recognition and multi-player collaboration. Students can also record sound for voiceovers and music with minimal echo or background noise in the audiometric room.</p>"
						  			+"<p>The Networking lab supports the Cisco Networking Academy curriculum, which uses state-of-the-art networking equipment to teach concepts ranging from fundamental networking skills up to enterprise-level network engineering.</p>", 
						  	img: 'simcoe.jpg',
						  	coords: [43.945817,-78.894633],
						  	coordsEntrance: [43.945817,-78.894633],
						  	icon: iconPixel,
						},
						{	name: 'South Wing',  
							label:'South Wing',
						  	code: 'sw',	
						  	desc: "<p>The South Wing is home to the Learning Commons â€“ a large centre comprised of an IT Support Desk and 200 computer workstations; and the Centre for Students with Disabilities.</p>"
									+"<p>South Wing has high-tech labs and classrooms such as the Interprofessional Centre of Excellence in Simulation used by students in the Faculty of Health Sciencesâ€™ Nursing program (collaborative with Durham College).</p>"
									+"<p>This building also houses Durham Collegeâ€™s dental clinic, Centre for Academic and Faculty Enrichment (CAFE), offices for the School of Health and Community Services, as well as The Riot, the on-campus radio station.</p>", 
						  	img: 'sw.jpg',
						  	coords: [43.94283,-78.89621],
						  	coordsEntrance: [43.94283,-78.89621],
						  	icon: iconPixel,
						},
						{	name: 'Student Centre',  
							label:'Student Centre',
						  	code: 'sc',	
						  	desc: "<p>Whether they are enjoying a concert, purchasing a gift or just visiting with friends, the Student Centre provides a place for students to relax and unwind. Services in this 1,900-square-metre building include the Student Association (Your SA) and  E.P. Taylor's, one of the top student pubs in Ontario, which offers award-winning programming that includes concerts, battles of the bands, comedy and variety shows, karaoke and much more.</p>", 
						  	img: 'sc.jpg',
						  	coords: [43.944173,-78.894612],
						  	coordsEntrance: [43.944173,-78.894612],
						  	icon: iconPixel,
						},
						{	name: 'Student Services Building',  
							label:'Student Services Building',
						  	code: 'ssb',	
						  	desc: "<p>The uniquely designed Durham College Student Services Building is one of the most comprehensive and all-encompassing student service facilities in Ontario. It is home to many services shared between UOIT and Durham College, such as the Diversity office, the Food Bank and the Womenâ€™s Centre. It is also home to various Durham College services including Career Services; Financial Aid and Awards; the Office of International Business Development; the Office of the Vice-President, Student Affairs; the Office of the Registrar; Student Academic Learning Services; and the Student Life department.</p>", 
						  	coords: [43.944863,-78.893661],
						  	coordsEntrance: [43.944863,-78.893661],
						  	icon: iconPixel,
						},
						{	name: 'U5 Building',  
							label:'U5 Building',
						  	code: 'u5',	
						  	desc: "<p>U5 is home to the Registrarâ€™s office and the Office of Student Life.</p>"
									+"<p>The RO is responsible for a wide range of functions supporting the universityâ€™s academic programs including:</p>"
									+"<ul>"
									+"<li>Aboriginal Resource Centre </li>"
									+"<li>Accounting cashier service</li>"
									+"<li>Admissions and transfer credit office</li>"
									+"<li>International office</li>"
									+"<li>Recruitment office</li>"
									+"<li>Records and Registration services</li>"
									+"<li>Student Awards and Financial Aid office</li>"
									+"</ul>"
									+"<p>The Office of Student Life oversees the Student Experience Centre (SEC), which  works with students, faculty, staff and the community to create a welcoming, supportive and challenging learning experience. The SEC offers Career Services; Disability Services for downtown Oshawa students; provides resources to students, landlords and residents through its Off-Campus Living service; and numerous programs including the Student Learning Centre, iBegin, Orientation and student workshops.</p>", 
						  	img: 'u5.jpg',
						  	coords: [43.946114,-78.896414],
						  	coordsEntrance: [43.946114,-78.896414],
						  	icon: iconPixel,
						},
						{	name: 'U6 Building', 
							label:'U6 Building', 
						  	code: 'u6',	
						  	desc: "<p>The U6 building houses the Enrolment Services offices.</p>", 
						  	coords: [43.94639,-78.896724],
						  	coordsEntrance: [43.94639,-78.896724],
						  	icon: iconPixel,
						},
						{	name: 'UL Building', 
							label:'UL Building', 
						  	code: 'ul',	
						  	desc: "<p>Located along Founders Drive, the UL Building has nine classrooms, research labs for the Faculty of Business and Information Technology, and a number of offices of the Student Association (Your SA).</p>", 
						  	img: 'ul.jpg',
						  	coords: [43.946196,-78.897308],
						  	coordsEntrance: [43.946196,-78.897308],
						  	icon: iconPixel,
						},
						{	name: 'University Pavillion',  
							label:'University Pavillion',
						  	code: 'up',	
						  	desc: "<p>The unique, igloo-shaped University Pavilion is one of UOITâ€™s larger lecture theatres. It is located adjacent to the Champions parking lot, just to the south of the Campus Recreation and Wellness Centre.</p>", 
						  	img: 'up.jpg',
						  	coords: [43.94319,-78.898649],
						  	coordsEntrance: [43.94319,-78.898649],
						  	icon: iconPixel,
						},
					]	
				},	
				{	category: 'Downtown Buildings',
					label: 'Downtown building',
					locations: [
						{	name: '2 Simcoe Street South', 
							label:'2 Simcoe Street South',
							code: '2simcoe',	
							desc: "<p>A dedicated floor at 2 Simcoe Street South provides 750 square metres of space used predominantly for research and office purposes.</p>", 
							img: '2simcoe.jpg',
							coords: [43.89732,-78.863898],
							coordsEntrance: [43.89732,-78.863898],
							icon: iconPixel,
						},
						{	name: '61 Charles Street', 
							label:'61 Charles Street',
							code: 'charles',	
							desc: "<p>Located on Charles Street immediately east of the General Motors Centre, the former Alger Press Building was renovated and refurbished in 2010.</p>"
									+"<p>The first and second floors include classrooms and lecture halls, office space, study areas, student services including the Registrar's office, the Student Life office, Student Awards and Financial Aid, a library dedicated to the Faculty of Social Science and Humanitiesâ€™ diverse programs and other common areas for students and faculty.</p>"
									+"<p>The third floor is the home of UOITâ€™s senior administration offices, External Relations (including Advancement, and Communications and Marketing), and Central Scheduling.</p>", 
							img: 'charles.jpg',
							coords: [43.897411,-78.857884],
							coordsEntrance: [43.897123,-78.858024],
							icon: iconPixel,
						},
						{	name: 'Bordessa Hall: Faculty of Social Science and Humanities', 
							label:'Bordessa Hall',
							code: 'bordessa',	
							desc: "<p>The Faculty of Social Science and Humanities occupies Bordessa Hall, immediately to the north of the Regent Theatre.</p>"
									+"<p>The 2,800-square-metre, five-storey facility includes four large classrooms, labs, study space for undergraduate and graduate students, a student lounge, a boardroom and faculty offices.</p>", 
							img: 'bordessa.jpg',
							coords: [43.898610, -78.862118],
							coordsEntrance: [43.898610, -78.862118],
							icon: iconPixel,
						},
						{	name: 'Faculty of Education', 
							label:'Faculty of Education',
							code: 'fed',	
							desc: "<p>Located in the heart of downtown Oshawa at 11 Simcoe Street North, the Faculty of Education was the inaugural UOIT faculty at the universityâ€™s downtown Oshawa location.</p>"
									+"<p>The building boasts many of the features UOIT students have come to expect from the innovative university, including wireless Internet connections. Students are also benefit from classrooms equipped with movable walls to provide larger spaces as required, innovative teaching technologies to help facilitate their learning and specialty classrooms for their science, art and drama studies.</p>"
									+"<p>The Lois Sleightholm Teacher Resource Centre, located at the entrance of the building, offers students a wealth of resources in a room filled with sunshine through its two-storey floor to ceiling windows. There is also a cafeteria on the lower level of the building with areas for gathering and conversation, as well as quiet rooms on upper floors for study and reflection.</p>", 
							img: 'fed.jpg',
							coords: [43.898033,-78.863549],
							coordsEntrance: [43.898033,-78.863549],
							icon: iconPixel,
						},
						{	name: 'Regent Theatre', 
							label:'Regent Theatre',
							code: 'regent',	
							desc: "<p>Given the theatre's history, the role it has played in downtown Oshawa and the special attachment the community continues to have for the Regent, UOIT is proud to have played a part in the restoration of the theatre returning it to its former glory.</p>"
									+"<p>Reopened in September 2010, the Regent is used as a large lecture theatre for UOIT students, and for community and cultural events during the evenings and on weekends throughout the year.</p>", 
							img: 'regent.jpg',
							coords: [43.898302,-78.861972],
							coordsEntrance: [43.898302,-78.861972],
							icon: iconPixel,
						},
						{	name: 'UOIT-Baagwating Indigenous Student Centre', 
							label:'Indigenous Student Centre',
							code: 'ubisc',	
							desc: "<p>The UBISC is a home away from home for Indigenous students. It offers a sense of family and belonging, and provides an environment that fosters personal and cultural growth as well as academic success.</p>", 
							img: 'ubisc.jpg',
							coords: [43.897743, -78.857552],
							coordsEntrance: [43.897743, -78.857552],
							icon: iconPixel,
						},
					]
				},
				{ 	category : 'Services',
					label: 'service',
				  	locations: [			  	
					  	{ 	name: 'Campus Bookstore', 
							code: 'bs',
							desc: "",
							coords: [43.943905,-78.896586],
							coordsEntrance: [43.943905,-78.896586],
							icon: {	url: iconService,
								  	origin: [0,0], 
								  	anchor: [10,0]
								  }				  	
					  	},
					  	{ 	name: 'Campus Health Centre', 
							code: 'hc',
							desc: "",
							coords: [43.944413,-78.898587],
							coordsEntrance: [43.944413,-78.898587],
							icon: {	url: iconService,
								  	origin: [0,0], 
								  	anchor: [10,0]
								  }				  	
					  	},
					  	{	name: 'Shipping and Receiving', 
						  	code: 'sr',
						  	desc: "",
						  	coords: [43.944148,-78.896932],
						  	coordsEntrance: [43.944148,-78.896932],
						  	icon: {	url: iconService,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},
					  	{ name: 'Shop61',
					  		code: 's61',
					  		desc: "",
					  		coords: [43.897653, -78.858074],
					  		coordsEntrance: [43.897123,-78.858024],
					  		icon: {	url: iconService,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
						  	
					  	},
					] 			
				},
				{ category : 'Emergency Services',
					label: 'emergency service',
				  	locations: [			  	
					  	{ name: 'AED - 61 Charles Street', 
		  					code: 'aed18',
		  					desc: "<p>Automatic External Defibrillator (AED) location: first floor opposite lobby stairs to second floor</p>",
		  					coords: [43.897263, -78.858089],
		  					coordsEntrance: [43.897263, -78.858089],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - ACE', 
		  					code: 'aed15',
		  					desc: "<p>Automatic External Defibrillator (AED) location: next to security office at entrance to wind tunnel facility</p>",
		  					coords: [43.945554, -78.899298],
		  					coordsEntrance: [43.945554, -78.899298],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Bordessa Hall', 
		  					code: 'aed16',
		  					desc: "<p>Automatic External Defibrillator (AED) location: on wall opposite main floor security desk</p>",
		  					coords: [43.898726, -78.862161],
		  					coordsEntrance: [43.898726, -78.862161],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Business and IT Building', 
		  					code: 'aed10',
		  					desc: "<p>Automatic External Defibrillator (AED) location: West end of atrium, beside First Aid box next to Room UB1041</p>",
		  					coords: [43.945254, -78.896301],
		  					coordsEntrance: [43.945254, -78.896301],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Campus Corners', 
		  					code: 'aed12',
		  					desc: "<p>Automatic External Defibrillator (AED) location: second floor opposite elevators</p>",
		  					coords: [43.947758, -78.895125],
		  					coordsEntrance: [43.947758, -78.895125],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Campus Ice Centre', 
		  					code: 'aed1',
		  					desc: "<p>Automatic External Defibrillator (AED) location: on wall opposite the reception desk beside entrance to the dressing rooms corridor</p>",
		  					coords: [43.950422, -78.898306],
		  					coordsEntrance: [43.950422, -78.898306],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Campus Recreation and Wellness Centre', 
		  					code: 'aed4',
		  					desc: "<p>Automatic External Defibrillator (AED) location: on East wall beside Room G1005, opposite first floor reception desk</p>",
		  					coords: [43.944268, -78.898413],
		  					coordsEntrance: [43.944268, -78.898413],
		  					icon: {	url: iconService,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Campus Tennis Centre', 
		  					code: 'aed6',
		  					desc: "<p>Automatic External Defibrillator (AED) location: Club House area</p>",
		  					coords: [43.948714, -78.898836],
		  					coordsEntrance: [43.948714, -78.898836],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Clean Energy Research Lab', 
		  					code: 'aed14',
		  					desc: "<p>Automatic External Defibrillator (AED) location: on wall at entrance to washrooms</p>",
		  					coords: [43.946471, -78.900210],
		  					coordsEntrance: [43.946471, -78.900210],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Energy Systems and Nuclear Science Research Centre', 
		  					code: 'aed20',
		  					desc: "<p>Automatic External Defibrillator (AED) location: second floor opposite Room ERC2029</p>",
		  					coords: [43.945744, -78.896520],
		  					coordsEntrance: [43.945744, -78.896520],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Faculty of Education', 
		  					code: 'aed13',
		  					desc: "<p>Automatic External Defibrillator (AED) location: main floor to right of elevator</p>",
		  					coords: [43.898032, -78.863693],
		  					coordsEntrance: [43.898032, -78.863693],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Gordon Willey Building', 
		  					code: 'aed3',
		  					desc: "<p>Automatic External Defibrillator (AED) location: on East wall opposite main security desk</p>",
		  					coords: [43.943441, -78.896874],
		  					coordsEntrance: [43.943441, -78.896874],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Library', 
		  					code: 'aed8',
		  					desc: "<p>Automatic External Defibrillator (AED) location: next to main floor elevators and stairway between Code Blue and phone</p>",
		  					coords: [43.945789, -78.897407],
		  					coordsEntrance: [43.945789, -78.897407],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Ontario Power Generation Engineering Building', 
		  					code: 'aed11',
		  					desc: "<p>Automatic External Defibrillator (AED) location: main floor, next to elevators at entrance to ACE building</p>",
		  					coords: [43.945755, -78.898604],
		  					coordsEntrance: [43.945755, -78.898604],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Regent Theatre', 
		  					code: 'aed17',
		  					desc: "<p>Automatic External Defibrillator (AED) location: first floor beside Room 120</p>",
		  					coords: [43.898160, -78.861941],
		  					coordsEntrance: [43.898160, -78.861941],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Simcoe Building', 
		  					code: 'aed7',
		  					desc: "<p>Automatic External Defibrillator (AED) location: Southwest corner of building near entrance to J and K wings</p>",
		  					coords: [43.945930, -78.895041],
		  					coordsEntrance: [43.945930, -78.895041],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Science Building', 
		  					code: 'aed9',
		  					desc: "<p>Automatic External Defibrillator (AED) location: second floor alcove opposite Room UA2028</p>",
		  					coords: [43.944671, -78.896529],
		  					coordsEntrance: [43.944671, -78.896529],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Student Centre', 
		  					code: 'aed5',
		  					desc: "<p>Automatic External Defibrillator (AED) location: upper level on wall to left of Tuck Shop",
		  					coords: [43.944141, -78.894714],
		  					coordsEntrance: [43.944141, -78.894714],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	{ name: 'AED - Student Services Building', 
		  					code: 'aed19',
		  					desc: "<p>Automatic External Defibrillator (AED) location: second floor to the left of main elevator</p>",
		  					coords: [43.944767, -78.893889],
		  					coordsEntrance: [43.944767, -78.893889],
		  					icon: {	url: iconServiceEmergency,
		  						  	origin: [0,0], 
		  						  	anchor: [10,0]
		  						  }				  	
					  	},
					  	
					] 			
				},
				{ 	category : 'Restaurants & Food Courts',
					label: 'restaurant/food court',
				  	locations: [
				  		{ 	name: 'Country Style Bistro', 
							code: 'foodcountry',
							desc: "<p>Country Style Bistro offers menu options with lots of seating for you to sit down, relax and enjoy your order. Its menu includes:</p>"
									+'<ul>'
									+'<li>Coffee and speciality coffees</li>'
									+'<li>Country Style donuts and pastries</li>'
									+'<li>Fresh-made deli sandwiches and wraps</li>'
									+'<li>Hot lunch entrÃ©es</li>'
									+'<li>Smoothies</li>'
									+'<ul>',
							coords: [43.942982,-78.895759],
							coordsEntrance: [43.942982,-78.895759],
							icon: {	url: iconFood,
								  	origin: [0,0], 
								  	anchor: [10,0]
								  }				  	
					  	},
					  	{	name: 'EP Taylor\'s Pub and Restaurant', 
						  	code: 'foodeppub',
						  	desc: "<p>Located in the Student Centre, E.P. Taylorâ€™s offers:</p>"
									+'<ul>'
									+'<li>Daily specials</li>'
									+'<li>Salads and wraps</li>'
									+'<li>Sandwiches</li>'
									+'<li>Traditional pub fare</li>'
									+'</ul>',
						  	coords: [43.944075,-78.894499],
						  	coordsEntrance: [43.944075,-78.894499],
						  	icon: {	url: iconFood,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},
					  	{	name: 'Fresh Food Company - South Village Residence ', 
						  	code: 'foodsimcoe',
						  	desc: "<p>The South Village Residence Dining Hall is our all-you-care-to-dine location and home to the Fresh Food Company. All menu items are prepared in front of you, fresh daily. Featured items include: </p>"
						  			+'<ul>'
						  			+'<li>An array of fresh fruits and vegetables</li>'
						  			+'<li>Asian stir-fry creation</li>'
						  			+'<li>Grilled entrÃ©es</li>'
						  			+'<li>Pizza</li>'
						  			+'<li>Premium desserts</li>'
						  			+'<li>Pasta</li>'
						  			+'</ul>',				  	
						  	coords: [43.942333,-78.897514],
						  	coordsEntrance: [43.942333,-78.897514],
						  	icon: {	url: iconFood,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},
					  	{	name: 'Library Cafe - Starbucks', 
						  	code: 'foodlib',
						  	desc: "<p>The full-service Starbucks, located at the Campus Library, serves:</p>"		  	
									+'<ul>'
									+'<li>Coffee on the go</li>'
									+'<li>Specialty coffee and tea</li>'
									+'<li>Hot beverage options</li>'
									+'</ul>',
						  	coords: [43.945636,-78.897382],
						  	coordsEntrance: [43.945636,-78.897382],
						  	icon: {	url: iconFood,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},
					  	{	name: 'Marketplace Food Court', 
						  	code: 'foodlib',
						  	desc: "<p>Located in the B-Wing of the Gordon Willey building the Marketplace is the largest food court on campus and offers an array of dining options. Featured offerings include:</p>"
									+'<ul>'
									+'<li>Burger Studio</li>'
									+'<li>Chicken Chicken</li>'
									+'<li>Express (salads, sandwiches, fruit cups and parfaits)</li>'
									+'<li>Expresso Coffee Company</li>'
									+'<li>Extreme Pita </li>'
									+'<li>Miso</li>'		
									+'<li>Pizza Pizza</li>'
									+'</ul>',
						  	coords: [43.943786,-78.897295],
						  	coordsEntrance: [43.943786,-78.897295],
						  	icon: {	url: iconFood,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},
					  	{ 	name: 'Quiznos Sub', 
							code: 'foodquizno',
							desc: "<p>The newly renovated Quiznoâ€™s offers the full line up of toasted sandwiches.</p>",
							coords: [43.944507,-78.897098],
							coordsEntrance: [43.944507,-78.897098],
							icon: {	url: iconFood,
								  	origin: [0,0], 
								  	anchor: [10,0]
								  }				  	
					  	},
					  	{	name: 'Simcoe Building Food Court', 
						  	code: 'foodsimcoe',
						  	desc: "<p>The Simcoe Building food court offers a range of food options including:</p>"
						  			+'<ul>'
						  			+'<li>Express (salads, sandwiches, fruit cups and parfaits)</li>'
						  			+'<li>Expresso Coffee Company</li>'
						  			+'<li>Grill Works</li>'
						  			+'<li>Pizza Pizza</li>'
						  			+'</ul>',
						  	coords: [43.945809,-78.894909],
						  	coordsEntrance: [43.945809,-78.894909],
						  	icon: {	url: iconFood,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},	
					  	{ 	name: 'Shagwell\'s on the Ridge', 
							code: 'foodshagwell',
							desc: "<p>Shagwells offers a relaxing atmosphere where you can enjoy high-quality restaurant food at student-friendly pricing. Located upstairs at the Campus Ice Centre, itâ€™s a great place to enjoy a meal with friends before, during or after a game.</p>",
							coords: [43.950919,-78.89837],
							coordsEntrance: [43.950978,-78.898737],
							icon: {	url: iconFood,
								  	origin: [0,0], 
								  	anchor: [10,0]
								  }				  	
					  	},		
					  	{ 	name: 'Subway - Campus Corners', 
							code: 'foodshagwell',
							desc: "<p>Subway features made-to-order sandwiches and salads for dine in or take out.</p>",
							coords: [43.947638,-78.8951  ],
							coordsEntrance: [43.947638,-78.8951  ],
							icon: {	url: iconFood,
								  	origin: [0,0], 
								  	anchor: [10,0]
								  }				  	
					  	},	
					  	{	name: 'Tim Horton\'s - Gordon Willey Building', 
						  	code: 'foodtim1',
						  	desc: "<p>Located in the B-Wing on the 2nd floor of the Gordon Willey Building, this full service Tim Horton\'s offers a variety of soups, sandwiches, baked goods and coffee.</p>",
						  	coords: [43.944026,-78.897025],
						  	coordsEntrance: [43.944026,-78.897025],
						  	icon: {	url: iconFood,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},
					  	{	name: 'Tim Horton\'s - Science Building', 
						  	code: 'foodtim2',
						  	desc: "<p>Located on the 1st floor of the Science Building, this Tim Horton\'s offers a variety of baked goods and coffee.</p>",
						  	coords: [43.944781,-78.895859],
						  	coordsEntrance: [43.944781,-78.895859],
						  	icon: {	url: iconFood,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},
					  	{	name: 'Tim Horton\'s - Student Services Building', 
						  	code: 'foodtim3',
						  	desc: "<p>Located on the 1st floor of the Student Services Building, this Tim Horton\'s offers a variety of baked goods and coffee.</p>",
						  	coords: [43.94504,-78.893544],
						  	coordsEntrance: [43.94504,-78.893544],
						  	icon: {	url: iconFood,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},
					  	{	name: 'Tim Horton\'s Express - Gordon Willey Building', 
						  	code: 'foodtim4',
						  	desc: "<p>Located in the I-Wing on the 1st floor of the Gordon Willey Building, this self-serve Tim Horton\'s offers a variety of baked goods and coffee.</p>",
						  	coords: [43.94381,-78.896036],
						  	coordsEntrance: [43.94381,-78.896036],
						  	icon: {	url: iconFood,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},		  	
					  	{ 	name: 'UB Cafe', 
							code: 'foodub',
							desc: "<p>The UB cafÃ© offers a wide range of food options including:</p>"
									+'<ul>'
									+'<li>Express</li>'
									+'<li>Grill Works</li>'
									+'<li>Pangeos</li>'
									+'<li>Salad Garden</li>'
									+'<li>Topio\'s Classic Pizza</li>'
									+'</ul>',
							coords: [43.94506,-78.895878],
							coordsEntrance: [43.94506,-78.895878],
							icon: {	url: iconFood,
								  	origin: [0,0], 
								  	anchor: [10,0]
								  }				  	
					  	},	  	
					] 			
				},
				{ 	category : 'Residences',
					label: 'residence',
				  	locations: [
					  	{	name: 'Simcoe Village Residence', 
					  		label:'Simcoe Village Residence', 
						  	code: 'ressim',
						  	desc: "<p>Our Simcoe Village (Central Hall, North Hall, South Hall) residence offer a number of different fully furnished suites and all of the comforts of home including:</p>"
									+"<ul>"
									+"<li>A three-piece bath</li>"
									+"<li>A kitchenette</li>"
									+"<li>A workspace</li>"
									+"<li>Plenty of space for creativity</li>"
									+"</ul>",
						  	img: 'ressim.jpg',
						  	coords: [43.944225,-78.892008],
						  	coordsEntrance: [43.944225,-78.892008],
						  	icon: iconPixel
					  	},
					  	{ 	name: 'South Village Residence',
					  		label:'South Village Residence', 
							code: 'ressv',
							desc: "<p>Our South Village residences offer suites with two private bedrooms and all of the comforts of home including:</p>"
									+"<ul>"
									+"<li>A three-piece bath</li>"
									+"<li>A kitchenette</li>"
									+"<li>A workspace</li>"
									+"<li>Plenty of space for creativity</li>"
									+"</ul>",
							img: 'ressv.jpg',
							coords: [43.941908,-78.897004],
							coordsEntrance: [43.941908,-78.897004],
							icon: iconPixel			  	
					  	},
					  	{ 	name: 'West Village Townhouses',
					  		label:'West Village Townhouses', 
							code: 'reswv',
							desc: "<p>The West Village residence offers apartment-style suites for students in their upper years of study. Three and six bedroom units are available and include five appliances, parking, networked Internet and large bedrooms with spacious closets.</p>"
									+"<p>For more information, please visit www.lpcrentals.com/oshawa</p>",
							img: 'reswv.jpg',
							coords: [43.942593,-78.898986],
							coordsEntrance: [43.942593,-78.898986],
							icon: iconPixel			  	
					  	},
					  	{ 	name: 'Residence and Conference Centre',
					  		label:'Residence and Conference Centre', 
							code: 'rescc',
							desc: "<p></p>",
							coords: [43.943905,-78.89152],
							coordsEntrance: [43.943905,-78.89152],
							icon: iconPixel			  	
					  	},
					] 			
				},
				{	category: 'Parking',
					label: 'parking lot',
					locations: [
						{	name: '61 Charles St Lot',
							code: 'parkcharles',
							desc: "<p>Parking</p>",
							coords: [43.896959, -78.857414],
							coordsEntrance: [43.896959, -78.857414],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'Bruce St Lot',
							code: 'parkchamp',
							desc: "<p>Parking</p>",
							coords: [43.895349, -78.859382],
							coordsEntrance: [43.895349, -78.859382],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'Champions Lot',
							code: 'parkchamp',
							desc: "<p>Parking</p>",
							coords: [43.943545,-78.898466],
							coordsEntrance: [43.943545,-78.898466],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'Commencement Lot',
							code: 'parkcomm',
							desc: "<p>Parking</p>",
							coords: [43.941649,-78.89498],
							coordsEntrance: [43.941649,-78.89498],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						
						{	name: 'Commencement Lot Pay Station 1',
							code: 'parkcommps1',
							desc: "<p>Parking Pay Station</p>",
							coords: [43.942129, -78.896087],	
							coordsEntrance: [43.942129, -78.896087],	
							icon: { url: iconParkingPaystation,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'Commencement Lot Pay Station 2',
							code: 'parkcommps2',
							desc: "<p>Parking Pay Station</p>",
							coords: [43.941769, -78.894412],	
							coordsEntrance: [43.941769, -78.894412],	
							icon: { url: iconParkingPaystation,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'East Residence Lot',
							code: 'parkeastres',
							desc: "<p>Parking</p>",
							coords: [43.943723, -78.891661],	
							coordsEntrance: [43.943723, -78.891661],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'Founders Lot 1',
							code: 'parkfound1',
							desc: "<p>Parking</p>",
							coords: [43.945353,-78.895221],
							coordsEntrance: [43.945353,-78.895221],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'Founders Lot 2',
							code: 'parkfound2',
							desc: "<p>Parking</p>",
							coords: [43.946983,-78.895784],
							coordsEntrance: [43.946983,-78.895784],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'Founders Lot 2 Pay Station',
							code: 'parkfound2ps',
							desc: "<p>Parking Pay Station</p>",
							coords: [43.946823, -78.896043],	
							coordsEntrance: [43.946823, -78.896043],	
							icon: { url: iconParkingPaystation,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'Founders Lot 3',
							code: 'parkfound3',
							desc: "<p>Parking</p>",
							coords: [43.946964,-78.897737],	
							coordsEntrance: [43.946964,-78.897737],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},	
						{	name: 'Founders Lot 6',
							code: 'parkfound6',
							desc: "<p>Parking</p>",
							coords: [43.948041,-78.89889],	
							coordsEntrance: [43.948041,-78.89889],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'Founders Lot 7',
							code: 'parkfound7',
							desc: "<p>Parking</p>",
							coords: [43.949872,-78.897951],	
							coordsEntrance: [43.949872,-78.897951],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
						{	name: 'Mary St Garage',
							code: 'parkmary',
							desc: "<p>Parking</p>",
							coords: [43.898757, -78.860347],	
							coordsEntrance: [43.898757, -78.860347],	
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }				
						},
		/*
						{ name: 'South Simcoe Lot',
							code: 'parkss',
							desc: '<p>Parking</p>',
							coords: [43.944086, -78.891069],
							coordsEntrance: [43.944086, -78.891069],
							icon: { url: iconParking,
								  	origin: [0,0], 
								  	anchor: [10,0]						
								  }	
						},
		*/
						{	name: 'Accessible Parking (61 Charles St Lot)',
							code: 'parkaccesscharles',
							desc: "<p>Accessible Parking</p>",
							coords: [43.897010, -78.857670],
							coordsEntrance: [43.897010, -78.857670],	
							icon: { url: iconParkingAccessible,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Accessible Parking (Champions Visitor Lot)',
							code: 'parkaccesschamp',
							desc: "<p>Accessible Parking</p>",
							coords: [43.944631, -78.898618],
							coordsEntrance: [43.944631, -78.898618],	
							icon: { url: iconParkingAccessible,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Accessible Parking (Commencement Lot)',
							code: 'parkaccesscomm',
							desc: "<p>Accessible Parking</p>",
							coords: [43.942303, -78.895929],
							coordsEntrance: [43.942303, -78.895929],	
							icon: { url: iconParkingAccessible,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Accessible Parking (East Residence Lot)',
							code: 'parkaccesseastres',
							desc: "<p>Accessible Parking</p>",
							coords: [43.944097, -78.892177],
							coordsEntrance: [43.944097, -78.892177],	
							icon: { url: iconParkingAccessible,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Accessible Parking (Founders Lot 1)',
							code: 'parkaccessfound1',
							desc: "<p>Accessible Parking</p>",
							coords: [43.945991, -78.895422],
							coordsEntrance: [43.945991, -78.895422],	
							icon: { url: iconParkingAccessible,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Accessible Parking (Founders Lot 2)',
							code: 'parkaccessfound2',
							desc: "<p>Accessible Parking</p>",
							coords: [43.946352, -78.895686],
							coordsEntrance: [43.946352, -78.895686],	
							icon: { url: iconParkingAccessible,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Accessible Parking (Founders Lot 3)',
							code: 'parkaccessfound3',
							desc: "<p>Accessible Parking</p>",
							coords: [43.946389, -78.898328],
							coordsEntrance: [43.946389, -78.898328],	
							icon: { url: iconParkingAccessible,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Accessible Parking (Founders Lot 6)',
							code: 'parkaccessfound6',
							desc: "<p>Accessible Parking</p>",
							coords: [43.948200, -78.899518],
							coordsEntrance: [43.948200, -78.899518],	
							icon: { url: iconParkingAccessible,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Accessible Parking (Founders Lot 7)',
							code: 'parkaccessfound7',
							desc: "<p>Accessible Parking</p>",
							coords: [43.950131, -78.898377],
							coordsEntrance: [43.950131, -78.898377],	
							icon: { url: iconParkingAccessible,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Accessible Parking (Student Services Building)',
							code: 'parkaccessssb',
							desc: "<p>Accessible Parking</p>",
							coords: [43.945302, -78.893498],
							coordsEntrance: [43.945302, -78.893498],	
							icon: { url: iconParkingAccessible,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Visitor Parking (Student Services Building)',
							code: 'parkvisitssb',
							desc: "<p>Parking</p>",
							coords: [43.945527,-78.893757],
							coordsEntrance: [43.945527,-78.893757],	
							icon: { url: iconParkingVisitor,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Visitor Parking (Champions Lot)',
							code: 'parkvisitchamp',
							desc: "<p>Parking</p>",
							coords: [43.944608,-78.898981],
							coordsEntrance: [43.944608,-78.898981],	
							icon: { url: iconParkingVisitor,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},	
						{	name: 'Visitor Parking (Commencement Lot)',
							code: 'parkvisitcomm',
							desc: "<p>Parking</p>",
							coords: [43.942479,-78.895194],
							coordsEntrance: [43.942479,-78.895194],	
							icon: { url: iconParkingVisitor,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},	
						{	name: 'Visitor Parking (Founders Lot 3)',
							code: 'parkvisitfound3',
							desc: "<p>Parking</p>",
							coords: [43.946534,-78.897668],
							coordsEntrance: [43.946534,-78.897668],	
							icon: { url: iconParkingVisitor,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},			
						{	name: 'Carpool Parking (Commencement Lot)',
							code: 'parkcarpool1',
							desc: "<p>Parking</p>",
							coords: [43.942605, -78.894639],
							coordsEntrance: [43.942605, -78.894639],	
							icon: { url: iconParkingCarpool,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Carpool Parking (Founders Lot 2)',
							code: 'parkcarpool2',
							desc: "<p>Parking</p>",
							coords: [43.946786, -78.896404],
							coordsEntrance: [43.946786, -78.896404],	
							icon: { url: iconParkingCarpool,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
						{	name: 'Carpool Parking (Founders Lot 3)',
							code: 'parkcarpool4',
							desc: "<p>Parking</p>",
							coords: [43.946310, -78.898666],
							coordsEntrance: [43.946310, -78.898666],	
							icon: { url: iconParkingCarpool,
								  	origin: [0,0], 
								  	anchor: [10,0]					
								  }				
						},
					]		
				},
				{ 	category : 'Outdoor Spaces',
					label: 'outdoor space',
				  	locations: [
					  	{	name: 'Polonsky Commons', 
						  	code: 'pc',
						  	desc: "<p>Named after UOIT's founding president, Dr. Gary Polonsky, this area is designed as a friendly outdoor gathering place for students. It features benches, trees sculptures and a reflecting pond.</p>"
									+"<p>The Polonsky Commons is at the heart of an attractive, pedestrian-friendly academic village, which fosters a strong sense of community and features outdoor pathways and meeting places, giving students plenty of opportunity for interaction and shared learning.</p>"
									+"<p>During the warmer months students can be found relaxing on park benches, or playing a game of soccer, Frisbee or football.</p>"
									+"<p>Deep below Polonsky Commons is UOIT's geothermal heating and cooling system, the largest in Canada and second largest in North America. The Borehole Thermal Energy System (BTES) is made up of 370 interconnected borehole tubes in a field nearly 200-metres deep. If laid from end to end, the amount of piping would stretch 75 kilometres. Each academic building is linked to a central plant through an underground tunnel.</p>",
						  	img: 'pc.jpg',
						  	coords: [43.945127,-78.89683],
						  	coordsEntrance: [43.945127,-78.89683],
						  	icon: {	url: iconOutdoor,
							  	  	origin: [0,0], 
							  	  	anchor: [10,0]
							  	  }
					  	},
					  	{ 	name: 'Vaso\'s Field', 
							code: 'vf',
							desc: "<p>Home of the menâ€™s and womenâ€™s Ridgebacks soccer teams, Vasoâ€™s Field is named after Vaso Vujanovic for his contribution to the sport. Vujanovic started his coaching career with the Durham College Lords men's soccer team in 1973 and led the program for 17 seasons. In August 2009, he was named inaugural head coach of the Ridgebacks men's soccer varsity program.</p>",
							coords: [43.948806,-78.897667],
							coordsEntrance: [43.948806,-78.897667],
							icon: {	url: iconOutdoor,
								  	origin: [0,0], 
								  	anchor: [10,0]
								  }				  	
					  	},
					] 			
				},
				{ 	category : 'Oshawa City Buildings',
					label: 'oshawa city building',
				  	locations: [
					  	{	name: 'Durham Region Court House', 
					  		label:'Durham Region Court House',
						  	code: 'drch',
						  	desc: "",
						  	coords: [43.900272, -78.858621],
						  	coordsEntrance: [43.900272, -78.858621],
						  	icon: iconPixel
					  	},
					  	{	name: 'General Motors Centre',
					  		label:'General Motors Centre', 
						  	code: 'gmc',
						  	desc: "",
						  	coords: [43.897039, -78.859110],
						  	coordsEntrance: [43.897039, -78.859110],
						  	icon: iconPixel
					  	},
					  	{	name: 'Oshawa Clinic', 
					  		label:'Oshawa Clinic',
						  	code: 'oc',
						  	desc: "",
						  	coords: [43.898351, -78.859115],
						  	coordsEntrance: [43.898351, -78.859115],
						  	icon: iconPixel
					  	},
					] 			
				},

			];
    return {
    	"all": function () {
    		return poi;
    	},
    	"locations": function () {
    		var out = [];
    		angular.forEach(poi, function(value) {
    			angular.forEach(value.locations, function (v) {
    				out.push(v);
    			});
    		});
    		return out;
    	},
    	"get": function (code) {
    		var out = {};
    		angular.forEach(poi, function(value) {
    			angular.forEach(value.locations, function (v) {
    				if (v.code == code) {
    					out = v;
    				}
    			});
    		});
    		return out;
    	}
    };
	});