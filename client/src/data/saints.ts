export type Saint = {
  date: string // MM-DD
  name: string
  title: string
  years?: string
  bio: string
  patronage?: string[]
}

export const saints: Saint[] = [
  { date: '01-01', name: 'Mary, Mother of God', title: 'Solemnity', bio: 'The Church honors Mary\'s divine motherhood on the octave day of Christmas, the oldest Marian feast in the Roman rite.', patronage: ['Mothers', 'the Church'] },
  { date: '01-02', name: 'Sts. Basil the Great & Gregory Nazianzen', title: 'Bishops & Doctors', years: '4th c.', bio: 'Two great Cappadocian Fathers who defended the divinity of Christ and the Holy Spirit against Arianism and shaped Eastern monasticism and theology.' },
  { date: '01-04', name: 'Elizabeth Ann Seton', title: 'Religious', years: '1774–1821', bio: 'The first native-born American canonized a saint, she founded the Sisters of Charity and the American parochial school system.', patronage: ['Catholic schools'] },
  { date: '01-06', name: 'André Bessette', title: 'Religious', years: '1845–1937', bio: 'A humble Holy Cross brother in Montreal renowned for his devotion to St. Joseph and countless reported healings.', patronage: ['caregivers'] },
  { date: '01-17', name: 'Anthony of Egypt', title: 'Abbot', years: '251–356', bio: 'Father of Christian monasticism, he withdrew into the desert to seek God in silence, battling temptation and inspiring generations of monks.', patronage: ['monks', 'skin diseases'] },
  { date: '01-20', name: 'Sebastian', title: 'Martyr', years: 'd. c. 288', bio: 'A Roman soldier martyred for his Christian faith, first by arrows and then by clubbing, after surviving the first attempt.', patronage: ['athletes', 'soldiers'] },
  { date: '01-21', name: 'Agnes', title: 'Virgin & Martyr', years: 'd. c. 304', bio: 'A young Roman girl who chose death over renouncing her consecrated virginity, martyred at about twelve or thirteen years old.', patronage: ['young girls', 'chastity'] },
  { date: '01-24', name: 'Francis de Sales', title: 'Bishop & Doctor', years: '1567–1622', bio: 'Bishop of Geneva known for his gentleness and his teaching that all people, not only religious, are called to holiness.', patronage: ['writers', 'journalists'] },
  { date: '01-25', name: 'The Conversion of St. Paul', title: 'Feast', bio: 'Commemorates Saul\'s dramatic encounter with the risen Christ on the road to Damascus, which turned him into the Apostle to the Gentiles.' },
  { date: '01-27', name: 'Angela Merici', title: 'Virgin', years: '1474–1540', bio: 'Founded the Ursulines, the first teaching order of women in the Church, dedicated to the Christian education of girls.', patronage: ['educators'] },
  { date: '01-28', name: 'Thomas Aquinas', title: 'Priest & Doctor', years: '1225–1274', bio: 'Dominican friar and the Church\'s greatest theologian, author of the Summa Theologiae, harmonizing faith and reason.', patronage: ['students', 'universities'] },
  { date: '02-02', name: 'The Presentation of the Lord', title: 'Feast', bio: 'Mary and Joseph present the infant Jesus in the Temple forty days after his birth, fulfilling the Law of Moses; also called Candlemas.' },
  { date: '02-03', name: 'Blaise', title: 'Bishop & Martyr', years: 'd. c. 316', bio: 'A physician-bishop remembered for miraculously healing a boy choking on a fishbone; throats are blessed in his honor.', patronage: ['throat ailments'] },
  { date: '02-05', name: 'Agatha', title: 'Virgin & Martyr', years: 'd. c. 251', bio: 'A Sicilian martyr who suffered torture rather than renounce her faith and her vow of virginity.', patronage: ['nurses', 'breast cancer patients'] },
  { date: '02-06', name: 'Paul Miki & Companions', title: 'Martyrs', years: 'd. 1597', bio: 'Twenty-six Christians, including Japanese laymen, priests, and religious, crucified at Nagasaki for the faith.', patronage: ['Japan'] },
  { date: '02-08', name: 'Josephine Bakhita', title: 'Religious', years: '1869–1947', bio: 'Sold into slavery as a child in Sudan, she found freedom in Christ and became a Canossian sister renowned for her serenity.', patronage: ['victims of human trafficking'] },
  { date: '02-10', name: 'Scholastica', title: 'Virgin', years: 'c. 480–543', bio: 'Twin sister of St. Benedict and foundress of women\'s Benedictine monasticism, remembered for a night of prayer that outlasted a storm.', patronage: ['nuns', 'convulsive children'] },
  { date: '02-11', name: 'Our Lady of Lourdes', title: 'Memorial', bio: 'Commemorates the 1858 apparitions of the Blessed Virgin Mary to St. Bernadette Soubirous at Lourdes, France, and the healing spring that followed.' },
  { date: '02-14', name: 'Cyril & Methodius', title: 'Bishops', years: '9th c.', bio: 'Brother missionaries to the Slavic peoples who devised the Glagolitic alphabet and translated Scripture and the liturgy into Slavonic.', patronage: ['Europe'] },
  { date: '02-21', name: 'Peter Damian', title: 'Bishop & Doctor', years: '1007–1072', bio: 'A reforming monk-bishop who worked tirelessly against clerical corruption and for the renewal of Church discipline.' },
  { date: '02-22', name: 'The Chair of St. Peter', title: 'Feast', bio: 'Celebrates the teaching authority of the Apostle Peter and his successors as the visible foundation of unity in the Church.' },
  { date: '02-23', name: 'Polycarp', title: 'Bishop & Martyr', years: 'c. 69–155', bio: 'A disciple of St. John the Apostle and bishop of Smyrna, burned at the stake for refusing to renounce Christ in old age.' },
  { date: '03-07', name: 'Perpetua & Felicity', title: 'Martyrs', years: 'd. 203', bio: 'A noblewoman and her slave, martyred together in Carthage; Perpetua\'s prison diary is among the earliest Christian writings by a woman.' },
  { date: '03-08', name: 'John of God', title: 'Religious', years: '1495–1550', bio: 'Founder of the Order of Hospitallers, he cared for the sick and poor in Granada, Spain, with heroic charity.', patronage: ['hospitals', 'the sick'] },
  { date: '03-09', name: 'Frances of Rome', title: 'Religious', years: '1384–1440', bio: 'A Roman noblewoman who combined married life and motherhood with deep prayer, founding a community of oblate women.', patronage: ['motorists', 'widows'] },
  { date: '03-17', name: 'Patrick', title: 'Bishop', years: 'c. 385–461', bio: 'Enslaved as a youth in Ireland, he returned as a missionary bishop and evangelized the island, using the shamrock to teach the Trinity.', patronage: ['Ireland'] },
  { date: '03-19', name: 'Joseph, Spouse of the Blessed Virgin Mary', title: 'Solemnity', bio: 'The foster father of Jesus and husband of Mary, a just man who obeyed God\'s call in silence and provided for the Holy Family.', patronage: ['fathers', 'workers', 'the universal Church'] },
  { date: '03-25', name: 'The Annunciation of the Lord', title: 'Solemnity', bio: 'The Angel Gabriel announces to Mary that she will conceive the Son of God, and she freely consents: "Let it be done unto me."' },
  { date: '04-02', name: 'Francis of Paola', title: 'Hermit', years: '1416–1507', bio: 'Founder of the Minim Friars, known for extreme austerity, humility, and miracles, including calming storms at sea.', patronage: ['sailors'] },
  { date: '04-05', name: 'Vincent Ferrer', title: 'Priest', years: '1350–1419', bio: 'A Dominican preacher whose sermons on penance drew enormous crowds across Europe and prompted many conversions.' },
  { date: '04-07', name: 'John Baptist de la Salle', title: 'Priest', years: '1651–1719', bio: 'Founder of the Brothers of the Christian Schools, he pioneered free education for poor children and teacher training.', patronage: ['teachers'] },
  { date: '04-11', name: 'Stanislaus', title: 'Bishop & Martyr', years: '1030–1079', bio: 'Bishop of Kraków martyred for defending the Church\'s rights against King Boleslaus II of Poland.', patronage: ['Poland'] },
  { date: '04-21', name: 'Anselm', title: 'Bishop & Doctor', years: '1033–1109', bio: 'Archbishop of Canterbury and father of scholastic theology, famous for his ontological argument for God\'s existence.' },
  { date: '04-23', name: 'George', title: 'Martyr', years: 'd. c. 303', bio: 'A Roman soldier martyred for his faith, honored since antiquity and depicted in legend slaying a dragon to save a princess.', patronage: ['soldiers', 'England'] },
  { date: '04-25', name: 'Mark the Evangelist', title: 'Feast', bio: 'Author of the earliest Gospel, companion of Peter and Paul, and traditional founder of the Church of Alexandria.', patronage: ['Venice', 'notaries'] },
  { date: '04-29', name: 'Catherine of Siena', title: 'Virgin & Doctor', years: '1347–1380', bio: 'A Dominican tertiary and mystic who urged the pope to return to Rome from Avignon; a Doctor of the Church despite no formal schooling.', patronage: ['Italy', 'nurses'] },
  { date: '05-01', name: 'Joseph the Worker', title: 'Memorial', bio: 'Honors St. Joseph\'s labor as a carpenter, sanctifying ordinary work and affirming the dignity of workers everywhere.', patronage: ['workers'] },
  { date: '05-02', name: 'Athanasius', title: 'Bishop & Doctor', years: 'c. 296–373', bio: 'Bishop of Alexandria who fought tirelessly against Arianism, defending the full divinity of Christ, often in exile.' },
  { date: '05-03', name: 'Philip & James, Apostles', title: 'Feast', bio: 'Two of the Twelve Apostles: Philip brought Nathanael to Jesus, and James "the Less" led the early Church in Jerusalem.' },
  { date: '05-13', name: 'Our Lady of Fatima', title: 'Memorial', bio: 'Commemorates the 1917 apparitions of the Blessed Virgin Mary to three shepherd children at Fatima, Portugal, with her call to prayer and penance.' },
  { date: '05-14', name: 'Matthias, Apostle', title: 'Feast', bio: 'Chosen by lot to replace Judas among the Twelve, restoring the apostolic number after the Ascension.' },
  { date: '05-15', name: 'Isidore the Farmer', title: 'Layman', years: '1070–1130', bio: 'A humble Spanish farm laborer renowned for his charity to the poor and constant life of prayer amid daily work.', patronage: ['farmers'] },
  { date: '05-20', name: 'Bernardine of Siena', title: 'Priest', years: '1380–1444', bio: 'A Franciscan preacher who promoted devotion to the Holy Name of Jesus and worked to reform the Franciscan order.' },
  { date: '05-25', name: 'Bede the Venerable', title: 'Priest & Doctor', years: '672–735', bio: 'An English Benedictine monk and scholar, "Father of English History," known for his Ecclesiastical History of the English People.' },
  { date: '05-26', name: 'Philip Neri', title: 'Priest', years: '1515–1595', bio: 'Founder of the Oratory, called the "Apostle of Rome" for his joyful, humor-filled evangelization among the youth of the city.', patronage: ['humor', 'Rome'] },
  { date: '05-31', name: 'The Visitation of the Blessed Virgin Mary', title: 'Feast', bio: 'Mary visits her cousin Elizabeth, who greets her as "Mother of my Lord," and Mary responds with the Magnificat.' },
  { date: '06-01', name: 'Justin Martyr', title: 'Martyr', years: 'c. 100–165', bio: 'A philosopher who converted to Christianity and became one of its earliest apologists, martyred in Rome for the faith.', patronage: ['philosophers'] },
  { date: '06-03', name: 'Charles Lwanga & Companions', title: 'Martyrs', years: 'd. 1886', bio: 'Young Ugandan converts, pages of the royal court, burned alive for refusing to renounce their Christian faith.', patronage: ['African youth'] },
  { date: '06-05', name: 'Boniface', title: 'Bishop & Martyr', years: '675–754', bio: '"Apostle of the Germans," an English missionary bishop martyred while evangelizing the Frisians.', patronage: ['Germany'] },
  { date: '06-11', name: 'Barnabas, Apostle', title: 'Feast', bio: 'A Levite who sold his property for the apostles and became Paul\'s missionary companion, called an apostle though not one of the Twelve.' },
  { date: '06-13', name: 'Anthony of Padua', title: 'Priest & Doctor', years: '1195–1231', bio: 'A gifted Franciscan preacher and biblical scholar, famously invoked for the recovery of lost items.', patronage: ['lost items', 'the poor'] },
  { date: '06-21', name: 'Aloysius Gonzaga', title: 'Religious', years: '1568–1591', bio: 'A young Jesuit nobleman who renounced his inheritance and died caring for plague victims at age twenty-three.', patronage: ['youth', 'students'] },
  { date: '06-22', name: 'Thomas More & John Fisher', title: 'Martyrs', years: '1478–1535 / 1469–1535', bio: 'An English chancellor and a bishop, both executed by Henry VIII for refusing to deny papal authority and the sanctity of marriage.', patronage: ['lawyers', 'statesmen'] },
  { date: '06-24', name: 'The Nativity of John the Baptist', title: 'Solemnity', bio: 'Celebrates the birth of the Forerunner, the last prophet of the Old Covenant who prepared the way for Christ.' },
  { date: '06-29', name: 'Peter & Paul, Apostles', title: 'Solemnity', bio: 'The two great pillars of the Church honored together: Peter, the rock on whom the Church is built, and Paul, apostle to the Gentiles.', patronage: ['Rome', 'the papacy'] },
  { date: '07-03', name: 'Thomas, Apostle', title: 'Feast', bio: 'Known as "doubting Thomas" for questioning the Resurrection until he touched Christ\'s wounds; tradition holds he evangelized India.', patronage: ['India', 'architects'] },
  { date: '07-06', name: 'Maria Goretti', title: 'Virgin & Martyr', years: '1890–1902', bio: 'An eleven-year-old girl who forgave her attacker as she died defending her purity, one of the youngest canonized saints.', patronage: ['youth', 'purity'] },
  { date: '07-11', name: 'Benedict', title: 'Abbot', years: 'c. 480–547', bio: 'Father of Western monasticism, author of the Rule of St. Benedict, "ora et labora" — pray and work.', patronage: ['Europe', 'monks'] },
  { date: '07-14', name: 'Kateri Tekakwitha', title: 'Virgin', years: '1656–1680', bio: 'The "Lily of the Mohawks," the first Native American canonized, known for her purity and devotion despite persecution.', patronage: ['ecology', 'Native Americans'] },
  { date: '07-15', name: 'Bonaventure', title: 'Bishop & Doctor', years: '1221–1274', bio: 'A Franciscan theologian and Minister General of the order, known as the "Seraphic Doctor" for his mystical theology.' },
  { date: '07-16', name: 'Our Lady of Mount Carmel', title: 'Memorial', bio: 'Honors the Blessed Virgin Mary under her title as patroness of the Carmelite Order and the gift of the brown scapular.' },
  { date: '07-22', name: 'Mary Magdalene', title: 'Feast', bio: 'A devoted disciple of Jesus, freed from affliction, present at the Cross, and the first witness of the Resurrection, "Apostle to the Apostles."' },
  { date: '07-23', name: 'Bridget of Sweden', title: 'Religious', years: '1303–1373', bio: 'A wife, mother, and mystic who founded the Bridgettine Order after receiving revelations concerning the Passion of Christ.', patronage: ['Europe', 'Sweden'] },
  { date: '07-25', name: 'James, Apostle', title: 'Feast', bio: 'Son of Zebedee and brother of John, the first apostle to be martyred; tradition venerates his tomb at Santiago de Compostela.', patronage: ['Spain', 'pilgrims'] },
  { date: '07-26', name: 'Joachim & Anne', title: 'Parents of the BVM', bio: 'Honored by tradition as the parents of the Blessed Virgin Mary and grandparents of Jesus.', patronage: ['grandparents'] },
  { date: '07-29', name: 'Martha, Mary & Lazarus', title: 'Feast', bio: 'The siblings of Bethany whose home Jesus loved to visit; Martha served, Mary sat at his feet, and Lazarus was raised from the dead.', patronage: ['hospitality', 'cooks'] },
  { date: '07-31', name: 'Ignatius of Loyola', title: 'Priest', years: '1491–1556', bio: 'A Spanish soldier converted during recovery from a battle wound, he founded the Society of Jesus and wrote the Spiritual Exercises.', patronage: ['soldiers', 'the Jesuits'] },
  { date: '08-01', name: 'Alphonsus Liguori', title: 'Bishop & Doctor', years: '1696–1787', bio: 'Founder of the Redemptorists, moral theologian, and prolific writer on prayer and devotion to Mary.', patronage: ['confessors', 'moral theologians'] },
  { date: '08-04', name: 'John Vianney', title: 'Priest', years: '1786–1859', bio: 'The Curé of Ars, who spent up to sixteen hours a day hearing confessions, drawing pilgrims from across France.', patronage: ['parish priests'] },
  { date: '08-06', name: 'The Transfiguration of the Lord', title: 'Feast', bio: 'Jesus is transfigured in glory before Peter, James, and John on Mount Tabor, revealing his divine nature.' },
  { date: '08-08', name: 'Dominic', title: 'Priest', years: '1170–1221', bio: 'Founder of the Order of Preachers (Dominicans), devoted to preaching, study, and the defense of the faith; tradition credits him with promoting the Rosary.', patronage: ['astronomers'] },
  { date: '08-09', name: 'Teresa Benedicta of the Cross (Edith Stein)', title: 'Virgin & Martyr', years: '1891–1942', bio: 'A Jewish philosopher who converted to Catholicism, became a Carmelite nun, and died at Auschwitz.', patronage: ['Europe', 'converts'] },
  { date: '08-10', name: 'Lawrence', title: 'Deacon & Martyr', years: 'd. 258', bio: 'A Roman deacon martyred on a gridiron for distributing the Church\'s treasures to the poor rather than surrendering them.', patronage: ['deacons', 'cooks'] },
  { date: '08-11', name: 'Clare of Assisi', title: 'Virgin', years: '1194–1253', bio: 'A follower of St. Francis who founded the Poor Clares, embracing radical poverty and Eucharistic devotion.', patronage: ['television', 'eye disease'] },
  { date: '08-14', name: 'Maximilian Kolbe', title: 'Priest & Martyr', years: '1894–1941', bio: 'A Franciscan friar who offered his life in place of a stranger at Auschwitz and died in a starvation bunker.', patronage: ['prisoners', 'families'] },
  { date: '08-15', name: 'The Assumption of the Blessed Virgin Mary', title: 'Solemnity', bio: 'Mary is taken up body and soul into heavenly glory at the end of her earthly life, a pledge of our own resurrection.', patronage: ['the United States'] },
  { date: '08-20', name: 'Bernard of Clairvaux', title: 'Abbot & Doctor', years: '1090–1153', bio: 'A Cistercian abbot and "Mellifluous Doctor," renowned preacher of the Second Crusade and devotee of Mary.' },
  { date: '08-22', name: 'The Queenship of Mary', title: 'Memorial', bio: 'Celebrates Mary\'s queenship in heaven, crowned by her Son as Queen of Heaven and Earth.' },
  { date: '08-23', name: 'Rose of Lima', title: 'Virgin', years: '1586–1617', bio: 'The first canonized saint of the Americas, known for extreme penance and care for the poor and sick of Lima, Peru.', patronage: ['Latin America', 'florists'] },
  { date: '08-24', name: 'Bartholomew, Apostle', title: 'Feast', bio: 'Often identified with Nathanael, "an Israelite in whom there is no guile," one of the Twelve Apostles.' },
  { date: '08-27', name: 'Monica', title: 'Widow', years: '331–387', bio: 'Mother of St. Augustine, who prayed for decades for her son\'s conversion with persevering tears.', patronage: ['mothers', 'wives'] },
  { date: '08-28', name: 'Augustine of Hippo', title: 'Bishop & Doctor', years: '354–430', bio: 'A brilliant convert and bishop whose Confessions and City of God shaped all of Western theology and philosophy.', patronage: ['theologians', 'brewers'] },
  { date: '09-03', name: 'Gregory the Great', title: 'Pope & Doctor', years: 'c. 540–604', bio: 'A monk turned pope who reformed the liturgy, sent missionaries to England, and cared for the poor of Rome during plague and famine.', patronage: ['musicians', 'teachers'] },
  { date: '09-08', name: 'The Nativity of the Blessed Virgin Mary', title: 'Feast', bio: 'Celebrates the birth of Mary, the dawn of our salvation and the vessel chosen to bear the Savior.' },
  { date: '09-13', name: 'John Chrysostom', title: 'Bishop & Doctor', years: '347–407', bio: 'Patriarch of Constantinople famed for his eloquent preaching, "Chrysostom" meaning "golden-mouthed."', patronage: ['preachers', 'orators'] },
  { date: '09-14', name: 'The Exaltation of the Holy Cross', title: 'Feast', bio: 'Honors the Cross of Christ as the instrument of our salvation, commemorating its recovery and veneration in Jerusalem.' },
  { date: '09-15', name: 'Our Lady of Sorrows', title: 'Memorial', bio: 'Meditates on the seven sorrows of Mary, from Simeon\'s prophecy to the burial of her Son.' },
  { date: '09-21', name: 'Matthew, Apostle & Evangelist', title: 'Feast', bio: 'A tax collector called by Jesus to leave his post and follow him, later author of the first Gospel.', patronage: ['accountants', 'bankers'] },
  { date: '09-23', name: 'Padre Pio (Pio of Pietrelcina)', title: 'Priest', years: '1887–1968', bio: 'A Capuchin friar who bore the stigmata for fifty years and spent hours daily hearing confessions with extraordinary insight.', patronage: ['confessors', 'civil defense volunteers'] },
  { date: '09-27', name: 'Vincent de Paul', title: 'Priest', years: '1581–1660', bio: 'Founder of the Vincentians and, with St. Louise de Marillac, the Daughters of Charity, devoted to serving the poor.', patronage: ['charitable organizations'] },
  { date: '09-29', name: 'Michael, Gabriel & Raphael, Archangels', title: 'Feast', bio: 'The three archangels named in Scripture: Michael the defender, Gabriel the messenger, and Raphael the healer.', patronage: ['protection'] },
  { date: '09-30', name: 'Jerome', title: 'Priest & Doctor', years: '347–420', bio: 'A scholar-monk who translated the Bible into Latin (the Vulgate) and lived as a hermit in Bethlehem.', patronage: ['translators', 'librarians'] },
  { date: '10-01', name: 'Thérèse of the Child Jesus (of Lisieux)', title: 'Virgin & Doctor', years: '1873–1897', bio: 'A Carmelite nun who died at twenty-four, famous for her "Little Way" of childlike trust in God\'s love.', patronage: ['missionaries', 'florists'] },
  { date: '10-02', name: 'The Holy Guardian Angels', title: 'Memorial', bio: 'Celebrates the angels God appoints to guide and protect each person throughout life.' },
  { date: '10-04', name: 'Francis of Assisi', title: 'Founder', years: '1181–1226', bio: 'A wealthy young man who embraced radical poverty, founded the Franciscans, and preached love for all creation.', patronage: ['animals', 'ecology', 'Italy'] },
  { date: '10-07', name: 'Our Lady of the Rosary', title: 'Memorial', bio: 'Commemorates the victory at Lepanto in 1571, attributed to the intercession of Mary through the praying of the Rosary.' },
  { date: '10-15', name: 'Teresa of Ávila (Jesus)', title: 'Virgin & Doctor', years: '1515–1582', bio: 'A Carmelite mystic and reformer who founded the Discalced Carmelites and wrote The Interior Castle.', patronage: ['Spain', 'those in religious life'] },
  { date: '10-17', name: 'Ignatius of Antioch', title: 'Bishop & Martyr', years: 'd. c. 107', bio: 'An early bishop who wrote seven letters en route to his martyrdom in Rome, rich in teaching on the Eucharist and Church unity.' },
  { date: '10-18', name: 'Luke, Evangelist', title: 'Feast', bio: 'A physician and companion of Paul who wrote the third Gospel and the Acts of the Apostles.', patronage: ['physicians', 'artists'] },
  { date: '10-22', name: 'John Paul II', title: 'Pope', years: '1920–2005', bio: 'The Polish pope who reigned over 26 years, helped bring down Communism, and traveled the world proclaiming "Be not afraid."' },
  { date: '10-28', name: 'Simon & Jude, Apostles', title: 'Feast', bio: 'Two of the Twelve Apostles; Jude is popularly invoked as patron of desperate and hopeless causes.', patronage: ['desperate causes'] },
  { date: '11-01', name: 'All Saints', title: 'Solemnity', bio: 'Honors all the saints in heaven, known and unknown, who now behold the face of God.' },
  { date: '11-02', name: 'All Souls', title: 'Commemoration', bio: 'The Church prays for all the faithful departed, that they may be purified and enter the fullness of glory.' },
  { date: '11-03', name: 'Martin de Porres', title: 'Religious', years: '1579–1639', bio: 'A Dominican brother of mixed race in colonial Lima renowned for his humility and care for the poor and sick, including animals.', patronage: ['racial harmony', 'barbers'] },
  { date: '11-04', name: 'Charles Borromeo', title: 'Bishop', years: '1538–1584', bio: 'Archbishop of Milan and a leading figure of the Catholic Reformation, tireless in pastoral reform and care for plague victims.', patronage: ['bishops', 'catechists'] },
  { date: '11-09', name: 'The Dedication of the Lateran Basilica', title: 'Feast', bio: 'Honors the cathedral church of Rome, "mother and head of all the churches of the city and the world."' },
  { date: '11-11', name: 'Martin of Tours', title: 'Bishop', years: '316–397', bio: 'A Roman soldier who famously cut his cloak in half for a beggar, later becoming a bishop known for founding monasteries.', patronage: ['soldiers', 'the poor'] },
  { date: '11-13', name: 'Frances Xavier Cabrini', title: 'Religious', years: '1850–1917', bio: 'An Italian-American religious sister who founded 67 institutions serving immigrants; first U.S. citizen canonized.', patronage: ['immigrants'] },
  { date: '11-17', name: 'Elizabeth of Hungary', title: 'Religious', years: '1207–1231', bio: 'A princess widowed young who devoted her wealth and life to caring for the poor and sick.', patronage: ['charities', 'the homeless'] },
  { date: '11-22', name: 'Cecilia', title: 'Virgin & Martyr', years: '3rd c.', bio: 'A Roman martyr traditionally said to have sung to God in her heart even as she was condemned to death.', patronage: ['musicians'] },
  { date: '11-30', name: 'Andrew, Apostle', title: 'Feast', bio: 'Brother of Peter and the first apostle called by Jesus, later a missionary who was crucified on an X-shaped cross.', patronage: ['fishermen', 'Scotland'] },
  { date: '12-03', name: 'Francis Xavier', title: 'Priest', years: '1506–1552', bio: 'A co-founder of the Jesuits who became one of history\'s greatest missionaries, evangelizing India, Japan, and beyond.', patronage: ['missionaries'] },
  { date: '12-06', name: 'Nicholas of Myra', title: 'Bishop', years: 'd. c. 343', bio: 'A bishop famed for his secret gifts to the poor, the historical inspiration behind the figure of Santa Claus.', patronage: ['children', 'sailors'] },
  { date: '12-07', name: 'Ambrose', title: 'Bishop & Doctor', years: '340–397', bio: 'Bishop of Milan whose preaching led to the conversion of St. Augustine; a champion of orthodoxy and Church independence.' },
  { date: '12-08', name: 'The Immaculate Conception', title: 'Solemnity', bio: 'Celebrates Mary being conceived without the stain of original sin, preserved by God\'s grace from the first moment of her existence.', patronage: ['the United States'] },
  { date: '12-09', name: 'Juan Diego', title: 'Layman', years: '1474–1548', bio: 'An indigenous Mexican to whom Our Lady of Guadalupe appeared, carrying her image miraculously imprinted on his tilma.' },
  { date: '12-12', name: 'Our Lady of Guadalupe', title: 'Feast', bio: 'Commemorates Mary\'s 1531 appearance to St. Juan Diego at Tepeyac, patroness of the Americas.', patronage: ['the Americas', 'the unborn'] },
  { date: '12-13', name: 'Lucy', title: 'Virgin & Martyr', years: 'd. 304', bio: 'A young Sicilian martyr invoked for eye ailments, her name meaning "light."', patronage: ['the blind'] },
  { date: '12-14', name: 'John of the Cross', title: 'Priest & Doctor', years: '1542–1591', bio: 'A Carmelite mystic and reformer, co-founder with St. Teresa of Ávila, author of Dark Night of the Soul.', patronage: ['mystics', 'poets'] },
  { date: '12-26', name: 'Stephen, the First Martyr', title: 'Feast', bio: 'A deacon of the early Church, stoned to death for his faith while praying for his persecutors, as recounted in Acts.', patronage: ['deacons'] },
  { date: '12-27', name: 'John, Apostle & Evangelist', title: 'Feast', bio: 'The "beloved disciple" who stood at the foot of the Cross, wrote the fourth Gospel, Epistles, and Revelation.' },
  { date: '12-28', name: 'The Holy Innocents', title: 'Feast', bio: 'Commemorates the infants of Bethlehem slain by Herod in his attempt to kill the newborn Christ.', patronage: ['babies', 'the unborn'] },
]

export function findSaintForDate(date: Date): Saint | undefined {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return saints.find((s) => s.date === `${mm}-${dd}`)
}

// Anonymous Gregorian algorithm for the date of Easter Sunday.
function easterSunday(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

// 4th Sunday before Christmas — the start of Advent for the given calendar year's Christmas.
function adventStartFor(year: number): Date {
  const christmas = new Date(year, 11, 25)
  const backToSunday = christmas.getDay() === 0 ? 7 : christmas.getDay()
  return addDays(christmas, -backToSunday - 21)
}

export type LiturgicalSeason = { name: string; color: string }

export function liturgicalSeasonFor(date: Date): LiturgicalSeason {
  const year = date.getFullYear()
  const easter = easterSunday(year)
  const ashWednesday = addDays(easter, -46)
  const holyThursday = addDays(easter, -3)
  const pentecost = addDays(easter, 49)

  const christmasThisYear = new Date(year, 11, 25)
  const christmasLastYear = new Date(year - 1, 11, 25)
  const epiphanyEnd = new Date(year, 0, 6) // approximate close of Christmas season
  const adventStartThisYear = adventStartFor(year)

  if (date >= holyThursday && date <= easter) return { name: 'Sacred Triduum', color: 'Red, Violet & White' }
  if (date >= ashWednesday && date < holyThursday) return { name: 'Lent', color: 'Violet' }
  if (date > easter && date <= pentecost) return { name: 'Easter', color: 'White & Gold' }
  if (date <= epiphanyEnd || date >= christmasLastYear && date < new Date(year, 0, 1)) return { name: 'Christmas', color: 'White & Gold' }
  if (date >= christmasThisYear) return { name: 'Christmas', color: 'White & Gold' }
  if (date >= adventStartThisYear && date < christmasThisYear) return { name: 'Advent', color: 'Violet' }
  return { name: 'Ordinary Time', color: 'Green' }
}
