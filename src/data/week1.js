// ─── Static content (same every week) ───────────────────────────────────────

export const staticContent = {
  welcome: {
    title: 'Welcome Routine',
    note: 'Consistency = security for children, comfort and positive behaviour.',
    steps: [
      {
        heading: 'Countdown',
        text: 'Put on a 10-second countdown on speaker. Children come in and gather when it finishes.',
      },
      {
        heading: 'Waterfall',
        text: 'Shout — put both hands up in the air, make a forward movement saying "shhh", then demonstrate going onto your knees.',
      },
      {
        heading: 'If still needed',
        text: 'Use a clapping pattern to bring everyone to focus.',
      },
    ],
  },

  tidyup: {
    title: 'Tidy Up Routine',
    note: 'Consistency = security for children, comfort and positive behaviour.',
    groups: [
      {
        heading: 'First Group',
        steps: [
          'Put on countdown music (10 seconds)',
          'Put on tidy-up song',
          'Help adults return all stations to starting positions',
          'Come to the circle — say all thank yous and goodbye',
        ],
      },
      {
        heading: 'Second Group',
        steps: [
          'Try to be finished before the end of the tidy-up song',
          'Everyone pick up 5 things',
          'Bring all equipment to the store',
          'Children into the cage/store',
        ],
      },
    ],
  },

  parentBriefing: {
    title: 'Parent Briefing',
    intro: 'Please share the following with parents before the session begins.',
    points: [
      'Please stay with your child at all times',
      'Copy what I do',
      'Encourage effort not perfection, and let them try',
      'The goal today is fun and confidence',
      'The more we put in, the more they get out',
      'Have fun!',
    ],
  },
}

// ─── Week 1 ─────────────────────────────────────────────────────────────────

export const week1 = {
  id: 1,
  title: 'Week 1',
  focus: 'Rolling & Kicking',

  layout: {
    notes: [
      'Set up initially for Cone Rescue — then reuse the same area for Tag Tails, then again for Parachute',
      'Set up Boulder Bowling in a separate zone',
      'Set up Find the Goal — reuse this area for Kick for Goal',
      'Set up Over the River in a separate zone',
      'When moving between areas, give children a movement challenge (e.g. hop, bounce, sidestep)',
    ],
    image: null,
  },

  warmup: [
    {
      id: 'cone-rescue',
      name: 'Cone Rescue',
      slot: 'Warm Up Game 1',
      equipment: ['Cones', 'Markers'],
      image: '/images/cone-rescue.png',
      instructions: [
        'Scatter cones around the area — some upright, some knocked over',
        'First round: run around and touch as many cones as you can',
        'Progress: use only your elbow, toe tap, or foot to stand fallen cones back upright — no hands!',
        'Focus on balance as you right the cones',
        'Optional: use a ball — dribble it around a cone before standing it up',
        'Game: grown-ups gently side-kick cones over; children race to stand them back up',
      ],
      easier: null,
      harder: 'Use a smaller area or set a time challenge',
    },
    {
      id: 'tag-tails',
      name: 'Tag Tails',
      slot: 'Warm Up Game 2',
      equipment: ['Cones', 'Bibs'],
      images: ['/images/tag-tails-diagram.png', '/images/tag-tails-image.png'],
      instructions: [
        'Mark out the playing area with cones',
        'Coach tucks 3 bibs into their waistband — children chase to grab them',
        'Each child gets 2 tails (bibs tucked into their shorts)',
        'Round 1: parents wear tails, children chase. Then swap roles.',
        'Once your tail is taken, you become a chaser',
      ],
      easier: 'Use a larger area',
      harder: 'Use a smaller area or add a time limit',
    },
  ],

  // Two activities per section — coaches tap the section tile to pick one
  throwing: [
    {
      id: 'find-the-goal',
      name: 'Find the Goal',
      slot: 'Throwing, Catching & Passing — Activity 1',
      skillCue: 'I can roll (arm pulled back, and roll action)',
      equipment: ['Cones', 'Football', 'Markers', 'Giant Ball'],
      image: '/images/find-the-goal.png',
      instructions: [
        'Set up area as shown — pairs of cone goals spread around the space',
        'Children with grown-up: find a set of goals',
        'Roll-pass the ball to your partner through the goal',
        'Progress: take a step back from the goal every time you get 5 in a row',
        'Next: move from goal to goal — the pair with the most goals wins!',
      ],
      encourage: 'Show the rolling action and encourage them to make the ball go further.',
      p1: 'Introduce correct pick-up technique.',
    },
    {
      id: 'boulder-bowling',
      name: 'Boulder Bowling',
      slot: 'Throwing, Catching & Passing — Activity 2',
      skillCue: null,
      equipment: ['Giant Ball', 'Cones', 'Football', 'Markers'],
      image: '/images/boulder-bowling.png',
      instructions: [
        'Set up the area as shown',
        'Divide the group into 2 teams',
        'Place the giant ball in the middle',
        'Players throw or roll their own balls to try to move the giant ball to the other team\'s end',
        'Encourage fun throughout',
      ],
      encourage: 'Show the rolling action and encourage them to make the ball go further.',
      p1: 'Introduce correct pick-up technique.',
    },
  ],

  kicking: [
    {
      id: 'kick-for-goal',
      name: 'Kick for Goal',
      slot: 'Kicking, Striking & Scoring — Activity 1',
      skillCue: 'I can kick (swingy leg action)',
      equipment: ['Cones', 'Football', 'Markers'],
      image: '/images/kick-for-goal.png',
      instructions: [
        'Players aim to kick the ball through the opponent\'s goal',
        '1 point for getting the ball between the goal markers',
        'Opponent tries to prevent goals',
        'Focus on the kicking action — and encourage fun!',
      ],
      extension: [
        'Demonstrate the kicking action',
        'Plant your left foot beside the ball',
        'Roll the ball off your right hand',
        'Kick using the laces / top part of the right shoe, point toe forward',
        'Try with the other foot for left-footed players',
      ],
    },
    {
      id: 'over-the-river',
      name: 'Over the River',
      slot: 'Kicking, Striking & Scoring — Activity 2',
      skillCue: null,
      equipment: ['Cones', 'Markers', 'Football'],
      image: '/images/over-the-river.png',
      instructions: [
        'Mark out 3 zones: two team end-zones and a middle "river" (approx 10m × 8m; river 3–6m wide depending on ability)',
        'One team at each end — players must stay in their own end-zone',
        'Kick the ball over the river to land in the opponent\'s zone to score a point',
        'Encourage fun — focus on the kicking action and which part of the foot to use',
        'Progress: widen the river as skill improves',
      ],
      encourage: 'Demonstrate the kick and highlight which part of the foot to use.',
      p1: 'Show the follow-through — toes pointing forward, swing through the ball.',
    },
  ],

  cooldown: {
    id: 'parachute',
    name: 'Parachute',
    slot: 'Cool Down',
    equipment: ['Parachute'],
    image: '/images/parachute.png',
    games: [
      {
        name: 'Fruits',
        steps: [
          'Give each child a fruit name — use 4 different fruits',
          'Walk around the circle and tell each child their fruit',
          'Call out a fruit — those children run under and swap places',
          'Repeat for all fruits',
          'Call "Fruit Salad" — everyone swaps at once!',
          'Adults stay at the edge to keep the parachute up',
        ],
      },
      {
        name: 'Mushroom',
        steps: [
          'Everyone lift the parachute up and down together',
          'After 3 lifts — lift it all the way over your heads',
          'Everyone sit on the edge at the same time — the inside creates a mushroom shape',
        ],
      },
    ],
  },
}

// ─── All 24 weeks skeleton (only Week 1 is fully populated) ─────────────────

export const allWeeks = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `Week ${i + 1}`,
  active: i === 0,
}))
