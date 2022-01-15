import { Message } from "@/entities/Message"
import { NarrativeKey, ResearchKey } from '@/enum/Enums'

const messages = {
  //Special Events
  [NarrativeKey.INTRO]: new Message('Intro', [{
      text: 'The year is 1984. You are Lennox, a physicist researching the most cutting-edge technology: Quantum Computing! With enough research, you should be able to build your own Quantum Computer.'
    }, {
      text: 'Let\'s get started...',
    }]
  ),
  [NarrativeKey.UNLOCK_COUNTDOWN]: new Message('You fire up your very first supercomputer.', [{
      person: 'Quantum Computer',
      text: 'Beep Boop. Detecting timelines. ALERT. ALERT. YOUR QUANTUM REALITY HAS SKEWED INTO A TANGENT. TIME IS ENDING. DOOMSDAY IMMINENT.',
    },{
      person: 'Lennox',
      text: 'Great Scott! What am I going to do? I\'ll need to invent a way to slow down time so that I have enough time to fix time!',
    }]
  ),
  [NarrativeKey.UNLOCK_WORKERS]: new Message('A Breakthrough.', [{
      person: 'Lennox',
      text: 'Eureka! If I reroute the nanoseconds through the quantum flux thingamajig in the compumatrix, I *should* be able to slow time down. If only I had some undergrads to help, this is a lot of work and I haven\'t even had time to order a pizza - the most important element of research!'
    }]
  ),
  [NarrativeKey.UNLOCK_SLOWDOWN]: new Message('The Undergrads make themselves useful.', [{
      person: 'Undergrad',
      text: 'Dr. Lennox. Dr. Lennox, take a look at this. It appears there is indeed a way to *add* more time before the Doomsday Event.',
    },{
      person: 'Lennox',
      text: 'I thought we were calling it the Doomsminute Event.',
    },{
      person: 'Undergrad',
      text: 'The media disagreed. What\'s important is that we can spend research to SLOW time down. So that we have more time... so to speak... to solve our time problem.',
    },{
      person: 'Lennox',
      text: 'Then it looks like it\'s time for the next phase.',
    }]
  ),
  [NarrativeKey.UNLOCK_YOUNG_LENNOX]: new Message('The Discovery of the Device.', [{
      person: 'Lennox',
      text: 'We\'ve done it. We\'ve found a way to stop the Doomsminute Event. We need to build THE DEVICE!'
    },{
      person: 'Undergrad',
      text: 'Doctor. We\'ve got a problem. Our research indicates that, with the exception of quantum physics, the kind of research required to complete THE DEVICE has been lost.'
    },{
      person: 'Lennox',
      text: 'Lost how?',
    },{
      person: 'Undergrad',
      text: 'Lost to time.',
    },{
      person: 'Lennox',
      text: 'What *kind* of research?',
    },{
      person: 'Undergrad',
      text: 'Well. It appears that only one scientist, back in the 30s, was doing this kind of biological research…',
    },{
      person: 'Lennox',
      text: 'WHO?',
    },{
      person: 'Undergrad',
      text: 'Well…YOU, doctor!',
    },{
      person: 'Lennox',
      text: 'By the Code!',
    },{
      person: 'Narrator',
      text: 'And it was at that time that Lennox experienced a *flashback*',
    }]
  ),
  [NarrativeKey.HALFWAY]: new Message('Halfway there', [{
      text: 'Whooooa we\'re halfway there whoooooa livin on software... click some more and we\'ll make it I swear...',
    }]
  ),
  [NarrativeKey.SPEAK_TO_LENNOX]: new Message('The Flashback', [{
      person: 'Young Lennox',
      text: 'Yessirma\'am, it is indeed an ordinary type day in the ordinary present in which I do my EXTRAORDINARY RESEARCH. It sure is quiet and lonely doing research of the singularly unique type to which I am accustomed to doing. Maybe the radio will help motivate me to greater heights of genius...'
    },{
      person: 'Narrator',
      text: 'And then, as Young Lennox fiddled with the radio dial...'
    },{
      person: 'Lennox',
      text: '(Speaking through the radio): Hello? Hello me, can you hear me?'
    },{
      person: 'Young Lennox',
      text: 'What an interesting program. They must be experimenting with something more interactive.'
    },{
      person: 'Lennox',
      text: 'No, you fool! I am speaking to you through the radio and, more importantly, through time!'
    },{
      person: 'Young Lennox',
      text: 'Inconceivable!'
    },{
      person: 'Lennox',
      text: 'Not so! Merely improbable! But time is short and you... I mean, I, must listen to me! Your research! You mustn\'t quit!'
    },{
      person: 'Young Lennox',
      text: 'I wasn\'t planning on it!'
    },{
      person: 'Lennox',
      text: 'Yes you are! In approximately three days you will lose most of your funding. But you must carry on! I am you from the future and I come with a dire warning... a quantum doomsday event is coming and I need your assistance to stop it... will you help me?'
    },{
      person: 'Young Lennox',
      text: 'As completely improbable, fantastical, and downright impossible as this all sounds... yes, I will help you... me. But if I continue my research, won\'t that change the trajectory of my future?'
    },{
      person: 'Lennox',
      text: '...'
    },{
      person: 'Young Lennox',
      text: '...'
    },{
      person: 'Lennox',
      text: '...let\'s not overthink this. Just carry on with your research and forward me the data.'
    },{
      person: 'Young Lennox',
      text: '...how?'
    },{
      person: 'Young Lennox',
      text: 'I suppose, just bury it in my backyard and time will take its course!'
    },{
      person: 'Young Lennox',
      text: 'Of course!'
    }]
  ),
  [NarrativeKey.UNLOCK_SAMA]: new Message('Breakthrough #2', [{
      person: 'Lennox',
      text: 'Younger me! I am once again contacting you through the science of quantum radio! Have you made any breakthroughs, perchance?'
    },{
      person: 'Young Lennox',
      text: 'As a matter of fact, I have! But you may not fancy the conclusion. My research has led me to conclude that only an immortal will be able to withstand the rigors necessary to save us from our time crisis. Once they are created, being immortal, they should be able to move through time normally to your present (my future) and save us from the Doomsminute Event. However, they will require a special chamber through which to manipulate the quantum mechanics - that is...'
    },{
      person: 'Lennox',
      text: 'You don\'t mean...?'
    },{
      person: 'Young Lennox',
      text: 'I do.'
    },{
      person: 'Lennox',
      text: 'A crystal sarcophagus! I always said it couldn\'t be done - and now, it must! Well, improbable as this may be, it is not an impossible task…I daresay I *do* fancy the challenge, my young self!'
    },{
      person: 'Young Lennox',
      text: 'But there is more, my wrinkled replica. In order to create this immortal, I must do more than stretch mere telomeres. Only one body of study from the ancient past, long forgotten, can solve a mystery for us and provide a key ingredient: a Philosopher\'s Stone!'
    },{
      person: 'Lennox',
      text: 'Then I know what I must do.'
    }]
  ),
  [NarrativeKey.SPEAK_TO_SAMA]: new Message('Enter the Alchemist.', [{
      person: 'Narrator',
      text: 'Using a Quantum Computer, Lennox sends an image even further back in time - to the golden age of alchemy.'
    },{
      person: 'Lennox',
      text: 'Can you hear me, oh great scientist?'
    },{
      person: 'Sama',
      text: 'I can *see* you! What is this strange projection before me? Surely I am not having a religious experience?'
    },{
      person: 'Lennox',
      text: 'That depends on how you feel about the heroics of saving the world. Sama. Great alchemist of a golden age - I beg your wisdom. You once sought a philosopher\'s stone but abandoned that research in favour of...'
    },{
      person: 'Sama',
      text: 'I have abandoned nothing!'
    },{
      person: 'Lennox',
      text: 'But you will! Hear me, for although time is abundant for you, for me it is precious and brief. I beg you not to abandon your studies. An experiment of mine has caused time to SKEW into a tangent... time itself is about to end. We need a philosopher\'s stone if we are ever to solve this problem, and only YOU can build one. And…bury it somewhere that only I can find it.'
    },{
      person: 'Sama',
      text: '...I\'m gonna need a bigger workshop. What do I get out of this?'
    },{
      person: 'Lennox',
      text: '...massive prestige long after you\'re dead?'
    }]
  ),
  [NarrativeKey.UNLOCK_ITOTIA]: new Message('Mathematical!', [{
      person: 'Lennox',
      text: 'How is progress, my medieval compatriot?'
    },{
      person: 'Sama',
      text: 'Medieval? What does that even mean...?'
    },{
      person: 'Lennox',
      text: '...never mind.'
    },{
      person: 'Sama',
      text: 'You are a strange apparition. Progress continues but I have encountered a problem. The stone must be... configured.'
    },{
      person: 'Lennox',
      text: 'Configured how?'
    },{
      person: 'Sama',
      text: 'Mathematically. Surely in your advanced time you can find a way.'
    },{
      person: 'Lennox',
      text: 'Or I could make the logical choice, and contact the greatest mathematicians ever!'
    },{
      text: 'And so...'
    },{
      person: 'Lennox',
      text: '...so will you help me, ancient Mayan?'
    },{
      person: 'Itotia',
      text: 'My name is Itotia. And yes. I will help you, even though your civilization is ending in 28 years.'
    },{
      person: 'Lennox',
      text: 'I just told you - it\'s ending far sooner!'
    },{
      person: 'Itotia',
      text: 'Not according to *our* calendars...'
    }]
  ),
  [NarrativeKey.UNLOCK_NECHTAN]: new Message('The Final Countdown', [{
      person: 'Itotia',
      text: 'The calculation is almost complete, Lennox. Now we must look to the stars.'
    },{
      person: 'Lennox',
      text: 'What do the stars have to...'
    },{
      person: 'Itotia',
      text: 'You future people spend too much time looking inward and not enough time looking up. Stop questioning everything.'
    },{
      person: 'Lennox',
      text: 'Like the lack of language barrier?'
    },{
      person: 'Itotia',
      text: 'Exactly. Neither should you question the need to create a massive series of stone pillars, to align the energy of the stars. My calculations point to this - it will be needed or the math will mean nothing. But we lack the resources to complete this. Surely in your time, massive stones are aplenty.'
    },{
      person: 'Lennox',
      text: 'An alignment of stone pillars, you say?. I know just the civilization...'
    },{
      text: 'And so...'
    },{
      person: 'Lennox',
      text: '...so that\'s what I need from your people, Nechtan. What do you say?'
    },{
      person: 'Itotia',
      text: 'I say we\'re gonna need a bigger boat. For the stones... y\'know.'
    }]
  ),
  [NarrativeKey.SUCCESS]: new Message('Device Completion', [{
    text: "And so, as the last stone rises on the ancient plain, Nechtan records the alignment of the stars and inscribes the information on a cavern wall..."
  },{
    text: "...solving the final riddle of Itotia's calculation, which is recorded on a calendar..."
  },{
    text: "...which Sama then uses to configure the philosopher's stone, which is buried in a box..."
  },{
    text: "...dug up by Young Lennox's archaeology team and fed to the volunteer Omegaperson..."
  },{
    text: "...who, in 1984, steps into the Crystal Sarcophagus in order to solve the TIME PARADOX! Congratulations, There Is Time Now!..."
    }]
  ),
  [NarrativeKey.FAILURE]: new Message('Failure', [{
    text: "As you watch the final seconds of the clock run out and drain the last drops of your whiskey, listening to the final throes of the undergrad's desperate bacchanal, you wonder: \"did I not click things quickly enough?\""
    },{
    text: "#outatime"
    }]
  ),

  //Sciences
  [ResearchKey.PHYSICS]: new Message('Unlocked Physics', [{
      text: 'The particulars of particles.'
    }]
  ),
  [ResearchKey.QUANTUM_COMPUTING]: new Message('Unlocked Quantum Computing', [{
      text: 'The study of how to use phenomena in quantum physics to create new ways of computing.'
    }]
  ),
  [ResearchKey.QUANTUM_COMPUTER]: new Message('Unlocked Quantum Computer', [{
      text: 'You\'ve made a quantum leap in the field of computing!'
    }]
  ),
  [ResearchKey.CHRONOCRYSTALS]: new Message('Unlocked Chronocrystals', [{
      text: 'I\'m sure in 2022 time crystals are available in every corner drug store, but in 1984 they\'re a little hard to come by.'
    }],
  ),
  [ResearchKey.BIOLOGY]: new Message('Unlocked Biology', [{
      text: 'The study of living stuff, and stuff.'
    }],
  ),
  [ResearchKey.GENETIC_MEMORY]: new Message('Unlocked Genetic Memory', [{
      text: 'Remember the memories.'
    }],
  ),
  [ResearchKey.TELOMERE_STRETCHER]: new Message('Unlocked Telomere Stretcher', [{
      text: 'It\'s a bit of a stretch, but you believe that prolonging a lifespan might be related to lengthening time.'
    }],
  ),
  [ResearchKey.THE_FLUID]: new Message('Unlocked The Fluid', [{
      text: 'The Fluid! Lennox, I must have the Fluid!'
    }],
  ),
  [ResearchKey.ALCHEMY]: new Message('Unlocked Alchemy', [{
      text: 'Sure it seems like a romantic pastime, but it\'s mostly mercury poisoning when you get down to it.'
    }],
  ),
  [ResearchKey.CHRONOMOGRIFICATION]: new Message('Unlocked Chronomogrification', [{
      text: 'You can transmogrify and now you can chronomogrify, but can you ever just mogrify?'
    }],
  ),
  [ResearchKey.DISTILLER]: new Message('Unlocked Distiller', [{
      text: 'I know you\'re tempted, but this is for science, not hooch.'
    }],
  ),
  [ResearchKey.ELEMENT_ZERO]: new Message('Unlocked Element Zero', [{
      text: 'Is this trademarked?'
    }],
  ),
  [ResearchKey.MATHEMATICS]: new Message('Unlocked Mathematics', [{
      text: 'The purest of the sciences, except for economics.'
    }],
  ),
  [ResearchKey.TIMELESS_ALGEBRA]: new Message('Unlocked Timeless Algebra', [{
      text: 'Classic.'
    }],
  ),
  [ResearchKey.NEPOHUALTZINTZIN]: new Message('Unlocked Nepohuatlzintzin', [{
      text: 'Eat your heart out, abacus.'
    }],
  ),
  [ResearchKey.OBSIDIAN]: new Message('Unlocked Obsidian', [{
      text: 'Coal\'s sexier cousin.'
    }],
  ),
  [ResearchKey.ASTRONOMY]: new Message('Unlocked Astronomy', [{
      text: 'Astronomy compels the soul to look upward, and...oh sorry, wrong game.'
    }],
  ),
  [ResearchKey.AETHERIC_HOROSCOPES]: new Message('Unlocked Aetheric Horoscopes', [{
      text: 'Astronomy, astrology...what\'s the difference?'
    }],
  ),
  [ResearchKey.ZODIAC_TALISMAN]: new Message('Unlocked Zodiac Talisman', [{
      text: 'Comes in 12 varieties'
    }],
  ),
  [ResearchKey.SARSEN_STONES]: new Message('Unlocked Sarsen Stones', [{
      text: '90% sandstone, 10% "how the heck did they move those massive things?"'
    }],
  ),

  //Devices
  [ResearchKey.CRYSTAL_SARCOPHAGUS]: new Message('Unlocked Crystal Sarcophagus', [{
      text: 'The final stage of the DEVICE. Why a sarcophagus? Because \'Crystal Crypt\' doesn\'t roll off the tongue.'
    }],
  ),
  [ResearchKey.OMEGAPERSON]: new Message('Unlocked Omegaperson', [{
      text: 'Not the Charlton Heston version.'
    }],
  ),  
  [ResearchKey.PHILOSOPHERS_STONE]: new Message('Unlocked Philosopher\'s Stone', [{
    text: 'Definitely not a Sorcerer\'s Stone. That\'s not even a real thing.'
    }],
  ),
  [ResearchKey.TZOLKIN]: new Message('Unlocked Tzolk\'in', [{
    text: '"The division of days." Whatever you do, do NOT divide them by zero.'
    }],
  ),
  [ResearchKey.TIMEHENGE]: new Message('Unlocked Timehenge', [{
    text: 'The name says it all.'
    }],
  ),
}

export { messages }