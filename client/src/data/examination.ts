export type ExaminationSection = {
  id: string
  title: string
  intro?: string
  questions: string[]
}

export const commandmentsExamination: ExaminationSection[] = [
  {
    id: 'c1',
    title: 'I. I am the Lord your God; you shall not have strange gods before me.',
    questions: [
      'Have I doubted or denied the existence of God, or willfully entertained doubts about the faith?',
      'Have I put my trust in superstition, horoscopes, fortune-telling, or the occult?',
      'Have I put other things before God — money, comfort, ambition, a relationship, myself?',
      'Have I neglected prayer for a long period of time?',
      'Have I received Communion in a state of mortal sin, or received Communion sacrilegiously?',
    ],
  },
  {
    id: 'c2',
    title: 'II. You shall not take the name of the Lord your God in vain.',
    questions: [
      'Have I used God\'s name, Jesus\' name, or the name of a saint in anger or without reverence?',
      'Have I been angry with God, cursed him, or complained seriously against him?',
      'Have I broken a vow or a serious promise made to God?',
      'Have I encouraged or ignored others who blaspheme or take God\'s name in vain?',
    ],
  },
  {
    id: 'c3',
    title: 'III. Remember to keep holy the Sabbath day.',
    questions: [
      'Have I missed Mass on Sunday or a holy day of obligation through my own fault?',
      'Have I arrived so late or left so early that I missed a significant part of the Mass?',
      'Have I done unnecessary work on Sunday that prevents rest and worship?',
      'Have I failed to make Sunday a day of family time, rest, and charity?',
    ],
  },
  {
    id: 'c4',
    title: 'IV. Honor your father and your mother.',
    questions: [
      'Have I been disrespectful, disobedient, or unkind to my parents or legitimate superiors?',
      'Have I neglected my duties to my spouse or children?',
      'Have I failed to care for aging or sick parents?',
      'Have I given scandal or a bad example to those in my care, especially children?',
      'Have I failed in my duties as a citizen — to vote responsibly, obey just laws, pay taxes honestly?',
    ],
  },
  {
    id: 'c5',
    title: 'V. You shall not kill.',
    questions: [
      'Have I harmed anyone physically, or wished serious harm or death upon another?',
      'Have I had, procured, or encouraged an abortion, or supported it?',
      'Have I abused alcohol or drugs, harming my own health and life?',
      'Have I harbored hatred, resentment, or a desire for revenge?',
      'Have I been a source of scandal that could lead another into sin?',
      'Have I neglected my physical or mental health, or engaged in reckless behavior?',
      'Have I been angry, impatient, or harsh in a way that wounded others?',
    ],
  },
  {
    id: 'c6-9',
    title: 'VI & IX. You shall not commit adultery; you shall not covet your neighbor\'s spouse.',
    questions: [
      'Have I been faithful in thought and action to my spouse, or chaste in my state of life?',
      'Have I viewed pornography or engaged in impure conversations, images, or media?',
      'Have I committed impure acts alone or with another outside of marriage?',
      'Have I used artificial contraception or acted directly against the transmission of life within marriage?',
      'Have I entertained impure thoughts or desires willingly?',
      'Have I dressed or acted in a way meant to provoke impure thoughts in others?',
    ],
  },
  {
    id: 'c7-10',
    title: 'VII & X. You shall not steal; you shall not covet your neighbor\'s goods.',
    questions: [
      'Have I stolen anything, or kept something that belongs to another?',
      'Have I cheated an employer, employee, or business partner?',
      'Have I failed to pay debts, or paid wages unjustly?',
      'Have I envied others their possessions, success, or blessings?',
      'Have I been greedy, wasteful, or excessively attached to material things?',
      'Have I damaged another\'s property, or failed to make restitution for wrong I have caused?',
    ],
  },
  {
    id: 'c8',
    title: 'VIII. You shall not bear false witness against your neighbor.',
    questions: [
      'Have I lied, exaggerated, or deceived others?',
      'Have I gossiped, spoken unnecessarily about others\' faults, or damaged someone\'s reputation?',
      'Have I judged others rashly or uncharitably?',
      'Have I broken a confidence or revealed a secret I should have kept?',
      'Have I failed to correct a false impression I created about someone?',
    ],
  },
]

export const generalExamination: ExaminationSection[] = [
  {
    id: 'love-of-god',
    title: 'Love of God',
    questions: [
      'Do I make time for daily prayer?',
      'Do I trust God in difficulties, or do I give in to despair and anxiety?',
      'Am I grateful for God\'s blessings, or do I take them for granted?',
      'Do I seek to grow in the virtues of faith, hope, and love?',
    ],
  },
  {
    id: 'love-of-neighbor',
    title: 'Love of Neighbor',
    questions: [
      'Am I patient and kind with the people I live and work with?',
      'Do I forgive those who have hurt me?',
      'Have I performed the works of mercy — feeding the hungry, visiting the sick, comforting the sorrowful?',
      'Am I generous with my time, talent, and treasure?',
    ],
  },
  {
    id: 'sins-of-the-heart',
    title: 'Interior Dispositions',
    questions: [
      'Have I been proud, seeking my own glory rather than God\'s?',
      'Have I been slothful in prayer, work, or duty?',
      'Have I indulged in gluttony, laziness, or excess of any kind?',
      'Do I examine my conscience regularly, or avoid facing my faults?',
    ],
  },
]

export const howToConfess = [
  'Examine your conscience prayerfully, asking the Holy Spirit for light to see your sins honestly.',
  'Enter the confessional or reconciliation room and greet the priest. He may offer a blessing.',
  'Say: "Bless me, Father, for I have sinned. It has been [time] since my last confession."',
  'Confess your sins honestly and simply, including the number and kind of any mortal sins.',
  'Listen to the priest\'s counsel and accept the penance he assigns.',
  'Pray an Act of Contrition, expressing sorrow for your sins.',
  'Receive absolution as the priest prays the words of forgiveness in persona Christi.',
  'Go in peace, and complete your penance as soon as reasonably possible.',
]
