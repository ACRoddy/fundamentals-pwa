-- ─── Fundamentals App — Week 1 Seed Data ─────────────────────────────────────
-- Run this AFTER schema.sql in Supabase Dashboard → SQL Editor

-- ─── Activities ───────────────────────────────────────────────────────────────

INSERT INTO public.activities (id, name, type, skill_cue, equipment, images, instructions, coaching_note, p1_note, easier, harder) VALUES
(
  'cone-rescue', 'Cone Rescue', 'warmup', NULL,
  ARRAY['Cones','Markers'],
  ARRAY['cone-rescue.png'],
  ARRAY[
    'Scatter cones around the area — some upright, some knocked over',
    'First round: run around and touch as many cones as you can',
    'Progress: use only your elbow, toe tap, or foot to stand fallen cones back upright — no hands!',
    'Focus on balance as you right the cones',
    'Optional: use a ball — dribble it around a cone before standing it up',
    'Game: grown-ups gently side-kick cones over; children race to stand them back up'
  ],
  NULL, NULL,
  NULL,
  'Use a smaller area or set a time challenge'
),
(
  'tag-tails', 'Tag Tails', 'warmup', NULL,
  ARRAY['Cones','Bibs'],
  ARRAY['tag-tails-diagram.png','tag-tails-image.png'],
  ARRAY[
    'Mark out the playing area with cones',
    'Coach tucks 3 bibs into their waistband — children chase to grab them',
    'Each child gets 2 tails (bibs tucked into their shorts)',
    'Round 1: parents wear tails, children chase. Then swap roles.',
    'Once your tail is taken, you become a chaser'
  ],
  NULL, NULL,
  'Use a larger area',
  'Use a smaller area or add a time limit'
),
(
  'find-the-goal', 'Find the Goal', 'throwing',
  'I can roll (arm pulled back, and roll action)',
  ARRAY['Cones','Football','Markers','Giant Ball'],
  ARRAY['find-the-goal.png'],
  ARRAY[
    'Set up area as shown — pairs of cone goals spread around the space',
    'Children with grown-up: find a set of goals',
    'Roll-pass the ball to your partner through the goal',
    'Progress: take a step back from the goal every time you get 5 in a row',
    'Next: move from goal to goal — the pair with the most goals wins!'
  ],
  'Show the rolling action and encourage them to make the ball go further.',
  'Introduce correct pick-up technique.',
  NULL, NULL
),
(
  'boulder-bowling', 'Boulder Bowling', 'throwing', NULL,
  ARRAY['Giant Ball','Cones','Football','Markers'],
  ARRAY['boulder-bowling.png'],
  ARRAY[
    'Set up the area as shown',
    'Divide the group into 2 teams',
    'Place the giant ball in the middle',
    'Players throw or roll their own balls to try to move the giant ball to the other team''s end',
    'Encourage fun throughout'
  ],
  'Show the rolling action and encourage them to make the ball go further.',
  'Introduce correct pick-up technique.',
  NULL, NULL
),
(
  'kick-for-goal', 'Kick for Goal', 'kicking',
  'I can kick (swingy leg action)',
  ARRAY['Cones','Football','Markers'],
  ARRAY['kick-for-goal.png'],
  ARRAY[
    'Players aim to kick the ball through the opponent''s goal',
    '1 point for getting the ball between the goal markers',
    'Opponent tries to prevent goals',
    'Focus on the kicking action — and encourage fun!'
  ],
  NULL, NULL, NULL, NULL
),
(
  'over-the-river', 'Over the River', 'kicking', NULL,
  ARRAY['Cones','Markers','Football'],
  ARRAY['over-the-river.png'],
  ARRAY[
    'Mark out 3 zones: two team end-zones and a middle "river" (approx 10m × 8m; river 3–6m wide depending on ability)',
    'One team at each end — players must stay in their own end-zone',
    'Kick the ball over the river to land in the opponent''s zone to score a point',
    'Encourage fun — focus on the kicking action and which part of the foot to use',
    'Progress: widen the river as skill improves'
  ],
  'Demonstrate the kick and highlight which part of the foot to use.',
  'Show the follow-through — toes pointing forward, swing through the ball.',
  NULL, NULL
),
(
  'parachute', 'Parachute', 'cooldown', NULL,
  ARRAY['Parachute'],
  ARRAY['parachute.png'],
  ARRAY[]::TEXT[],
  NULL, NULL, NULL, NULL
);

-- Update kick-for-goal extension steps
UPDATE public.activities SET extension = ARRAY[
  'Demonstrate the kicking action',
  'Plant your left foot beside the ball',
  'Roll the ball off your right hand',
  'Kick using the laces / top part of the right shoe, point toe forward',
  'Try with the other foot for left-footed players'
] WHERE id = 'kick-for-goal';

-- Update parachute games_data
UPDATE public.activities SET games_data = '[
  {
    "name": "Fruits",
    "steps": [
      "Give each child a fruit name — use 4 different fruits",
      "Walk around the circle and tell each child their fruit",
      "Call out a fruit — those children run under and swap places",
      "Repeat for all fruits",
      "Call \"Fruit Salad\" — everyone swaps at once!",
      "Adults stay at the edge to keep the parachute up"
    ]
  },
  {
    "name": "Mushroom",
    "steps": [
      "Everyone lift the parachute up and down together",
      "After 3 lifts — lift it all the way over your heads",
      "Everyone sit on the edge at the same time — the inside creates a mushroom shape"
    ]
  }
]'::JSONB WHERE id = 'parachute';

-- ─── Week 1 Plan ──────────────────────────────────────────────────────────────

INSERT INTO public.week_plans (week_number, focus, layout_notes, is_active) VALUES (
  1,
  'Rolling & Kicking',
  ARRAY[
    'Set up initially for Cone Rescue — then reuse the same area for Tag Tails, then again for Parachute',
    'Set up Boulder Bowling in a separate zone',
    'Set up Find the Goal — reuse this area for Kick for Goal',
    'Set up Over the River in a separate zone',
    'When moving between areas, give children a movement challenge (e.g. hop, bounce, sidestep)'
  ],
  true
);

-- ─── Week 1 Session Slots ─────────────────────────────────────────────────────

INSERT INTO public.session_slots (week_number, section, slot_order, activity_id) VALUES
  (1, 'warmup',   1, 'cone-rescue'),
  (1, 'warmup',   2, 'tag-tails'),
  (1, 'throwing', 1, 'find-the-goal'),
  (1, 'throwing', 2, 'boulder-bowling'),
  (1, 'kicking',  1, 'kick-for-goal'),
  (1, 'kicking',  2, 'over-the-river'),
  (1, 'cooldown', 1, 'parachute');
