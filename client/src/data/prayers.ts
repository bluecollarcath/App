export type Prayer = {
  id: string
  title: string
  category: string
  premium?: boolean
  text: string
}

export const prayers: Prayer[] = [
  {
    id: 'sign-of-the-cross',
    title: 'Sign of the Cross',
    category: 'Essential',
    text: `In the name of the Father, and of the Son, and of the Holy Spirit. Amen.`,
  },
  {
    id: 'our-father',
    title: 'Our Father',
    category: 'Essential',
    text: `Our Father, who art in heaven,\nhallowed be thy name;\nthy kingdom come;\nthy will be done\non earth as it is in heaven.\nGive us this day our daily bread;\nand forgive us our trespasses\nas we forgive those who trespass against us;\nand lead us not into temptation,\nbut deliver us from evil.\nAmen.`,
  },
  {
    id: 'hail-mary',
    title: 'Hail Mary',
    category: 'Essential',
    text: `Hail Mary, full of grace, the Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death.\nAmen.`,
  },
  {
    id: 'glory-be',
    title: 'Glory Be',
    category: 'Essential',
    text: `Glory be to the Father, and to the Son, and to the Holy Spirit.\nAs it was in the beginning, is now, and ever shall be,\nworld without end.\nAmen.`,
  },
  {
    id: 'apostles-creed',
    title: "Apostles' Creed",
    category: 'Essential',
    text: `I believe in God, the Father almighty,\nCreator of heaven and earth,\nand in Jesus Christ, his only Son, our Lord,\nwho was conceived by the Holy Spirit,\nborn of the Virgin Mary,\nsuffered under Pontius Pilate,\nwas crucified, died and was buried;\nhe descended into hell;\non the third day he rose again from the dead;\nhe ascended into heaven,\nand is seated at the right hand of God the Father almighty;\nfrom there he will come to judge the living and the dead.\nI believe in the Holy Spirit,\nthe holy catholic Church,\nthe communion of saints,\nthe forgiveness of sins,\nthe resurrection of the body,\nand life everlasting.\nAmen.`,
  },
  {
    id: 'grace-before-meals',
    title: 'Grace Before Meals',
    category: 'Daily Life',
    text: `Bless us, O Lord, and these thy gifts,\nwhich we are about to receive from thy bounty,\nthrough Christ our Lord.\nAmen.`,
  },
  {
    id: 'grace-after-meals',
    title: 'Grace After Meals',
    category: 'Daily Life',
    text: `We give thee thanks for all thy benefits, O Almighty God,\nwho livest and reignest world without end.\nAmen.\nMay the souls of the faithful departed,\nthrough the mercy of God, rest in peace.\nAmen.`,
  },
  {
    id: 'morning-offering',
    title: 'Morning Offering',
    category: 'Daily Life',
    text: `O Jesus, through the Immaculate Heart of Mary,\nI offer you my prayers, works, joys, and sufferings of this day\nfor all the intentions of your Sacred Heart,\nin union with the Holy Sacrifice of the Mass throughout the world,\nfor the salvation of souls, the reparation of sins,\nthe reunion of all Christians,\nand in particular for the intentions of the Holy Father this month.\nAmen.`,
  },
  {
    id: 'angel-of-god',
    title: 'Angel of God (Guardian Angel Prayer)',
    category: 'Daily Life',
    text: `Angel of God, my guardian dear,\nto whom God's love commits me here,\never this day be at my side,\nto light and guard, to rule and guide.\nAmen.`,
  },
  {
    id: 'act-of-contrition',
    title: 'Act of Contrition',
    category: 'Confession',
    text: `O my God, I am heartily sorry for having offended thee,\nand I detest all my sins,\nbecause I dread the loss of heaven and the pains of hell,\nbut most of all because they offend thee, my God,\nwho art all good and deserving of all my love.\nI firmly resolve, with the help of thy grace,\nto sin no more, and to avoid the near occasions of sin.\nAmen.`,
  },
  {
    id: 'act-of-faith',
    title: 'Act of Faith',
    category: 'Acts of Virtue',
    premium: true,
    text: `O my God, I firmly believe that you are one God in three divine Persons,\nFather, Son, and Holy Spirit.\nI believe that your divine Son became man\nand died for our sins, and that he will come\nto judge the living and the dead.\nI believe these and all the truths\nwhich the Holy Catholic Church teaches,\nbecause you have revealed them,\nwho can neither deceive nor be deceived.\nAmen.`,
  },
  {
    id: 'act-of-hope',
    title: 'Act of Hope',
    category: 'Acts of Virtue',
    premium: true,
    text: `O Lord God, I hope by your grace\nfor the pardon of all my sins\nand after life here to gain eternal happiness,\nbecause you have promised it\nwho are infinitely powerful, faithful, kind, and merciful.\nAmen.`,
  },
  {
    id: 'act-of-love',
    title: 'Act of Love',
    category: 'Acts of Virtue',
    premium: true,
    text: `O Lord God, I love you above all things\nand I love my neighbor for your sake\nbecause you are the highest, infinite and perfect good,\nworthy of all my love.\nIn this love I intend to live and die.\nAmen.`,
  },
  {
    id: 'hail-holy-queen',
    title: 'Hail, Holy Queen (Salve Regina)',
    category: 'Marian',
    text: `Hail, holy Queen, Mother of mercy,\nour life, our sweetness, and our hope.\nTo thee do we cry, poor banished children of Eve.\nTo thee do we send up our sighs,\nmourning and weeping in this valley of tears.\nTurn then, most gracious advocate,\nthine eyes of mercy toward us,\nand after this our exile,\nshow unto us the blessed fruit of thy womb, Jesus.\nO clement, O loving, O sweet Virgin Mary.\n\nPray for us, O holy Mother of God,\nthat we may be made worthy of the promises of Christ.\nAmen.`,
  },
  {
    id: 'memorare',
    title: 'Memorare',
    category: 'Marian',
    text: `Remember, O most gracious Virgin Mary,\nthat never was it known\nthat anyone who fled to your protection,\nimplored your help, or sought your intercession\nwas left unaided.\n\nInspired by this confidence,\nI fly unto you, O Virgin of virgins, my Mother.\nTo you do I come, before you I stand, sinful and sorrowful.\nO Mother of the Word Incarnate,\ndespise not my petitions,\nbut in your mercy hear and answer me.\nAmen.`,
  },
  {
    id: 'angelus',
    title: 'The Angelus',
    category: 'Marian',
    premium: true,
    text: `V. The Angel of the Lord declared unto Mary.\nR. And she conceived of the Holy Spirit.\nHail Mary...\n\nV. Behold the handmaid of the Lord.\nR. Be it done unto me according to thy word.\nHail Mary...\n\nV. And the Word was made flesh.\nR. And dwelt among us.\nHail Mary...\n\nV. Pray for us, O holy Mother of God.\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray:\nPour forth, we beseech thee, O Lord,\nthy grace into our hearts,\nthat we to whom the incarnation of Christ, thy Son,\nwas made known by the message of an angel,\nmay by his passion and cross\nbe brought to the glory of his resurrection.\nThrough the same Christ our Lord.\nAmen.`,
  },
  {
    id: 'divine-mercy-chaplet',
    title: 'Chaplet of Divine Mercy',
    category: 'Devotions',
    premium: true,
    text: `Begin with the Our Father, Hail Mary, and the Apostles' Creed.\n\nOn the Our Father beads say:\nEternal Father, I offer you the Body and Blood,\nSoul and Divinity of your dearly beloved Son,\nOur Lord Jesus Christ,\nin atonement for our sins and those of the whole world.\n\nOn the 10 Hail Mary beads say:\nFor the sake of his sorrowful Passion,\nhave mercy on us and on the whole world.\n\nRepeat for all five decades.\n\nConclude (three times):\nHoly God, Holy Mighty One, Holy Immortal One,\nhave mercy on us and on the whole world.`,
  },
  {
    id: 'anima-christi',
    title: 'Anima Christi (Soul of Christ)',
    category: 'Devotions',
    premium: true,
    text: `Soul of Christ, sanctify me.\nBody of Christ, save me.\nBlood of Christ, inebriate me.\nWater from the side of Christ, wash me.\nPassion of Christ, strengthen me.\nO good Jesus, hear me.\nWithin thy wounds hide me.\nSuffer me not to be separated from thee.\nFrom the malicious enemy defend me.\nIn the hour of my death call me,\nand bid me come to thee,\nthat with thy saints I may praise thee\nforever and ever.\nAmen.`,
  },
  {
    id: 'prayer-to-st-michael',
    title: 'Prayer to St. Michael the Archangel',
    category: 'Devotions',
    text: `St. Michael the Archangel, defend us in battle.\nBe our protection against the wickedness and snares of the devil.\nMay God rebuke him, we humbly pray,\nand do thou, O Prince of the heavenly host,\nby the power of God,\nthrust into hell Satan and all the evil spirits\nwho prowl about the world seeking the ruin of souls.\nAmen.`,
  },
  {
    id: 'eternal-rest',
    title: 'Eternal Rest',
    category: 'For the Departed',
    text: `Eternal rest grant unto them, O Lord,\nand let perpetual light shine upon them.\nMay they rest in peace.\nAmen.\nMay their souls, and the souls of all the faithful departed,\nthrough the mercy of God, rest in peace.\nAmen.`,
  },
  {
    id: 'come-holy-spirit',
    title: 'Come, Holy Spirit',
    category: 'Devotions',
    text: `Come, Holy Spirit, fill the hearts of your faithful\nand kindle in them the fire of your love.\nSend forth your Spirit and they shall be created.\nAnd you shall renew the face of the earth.\n\nLet us pray:\nO God, who by the light of the Holy Spirit\ndid instruct the hearts of the faithful,\ngrant that by the same Holy Spirit\nwe may be truly wise\nand ever enjoy his consolations.\nThrough Christ our Lord.\nAmen.`,
  },
]
