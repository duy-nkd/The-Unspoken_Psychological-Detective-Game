# Task: 24-frame side walk cycle for an EXISTING game character (same character, more frames)

Attached:
- `detective-walk-side-v2.png` (REQUIRED) — the current, approved walk sheet of our main character:
  2048 × 768 px, pure green #00FF00 background, 8 poses from left to right, character facing LEFT
  in pure side profile, full height ≈ 617 px, soles on a ground line at y ≈ 688.
- `detective-turnaround.png` (optional) — front / side / back views of the same character. Use it
  only to understand the design (bag, strap, shirt). Never change the design.

Goal: make the existing walk smoother by redrawing it as a 24-frame loop. This is NOT a redesign.
Seen side by side with the old animation, it must be the same character, same art style, same
size and same stride — only with more in-between frames and a natural arm swing (the one planned
change, see section 3).

## 1. Character — keep exactly as in the reference

- Young man with short black hair (same cut and fringe), same face profile, ear, eye and skin tone.
- Open dark plaid flannel shirt (charcoal/navy with rust-brown checks), sleeves rolled up to the
  forearm, over a dark grey T-shirt; shirt hem untucked, same length.
- Black sling bag worn on the back; its strap runs diagonally across the chest with the same
  buckle. Same bag size and position.
- Dark charcoal slim jeans. Brown-grey canvas low-top sneakers with light laces and cream soles;
  both shoes identical.
- Same art style: clean outline, soft cel shading, same line weight, same light direction, same
  colours. Same plaid scale; the pattern must not swim or flicker between frames.
- Same proportions and size: full height ≈ 617 px (top of hair to bottom of sole), as in the
  reference. Do not rescale.

## 2. View and direction

- Pure side profile facing LEFT, exactly like the reference (the game mirrors it for walking
  right). No 3/4 turn, no camera tilt, no perspective change between frames.
- Walk in place (treadmill style): the head-and-chest area stays at the same x position in every
  frame. Only the legs, arms, bag and a small vertical bob move.

## 3. Motion — 24 frames = 1 full cycle = 2 steps

Frames 1–12 are the step with leg A forward; frames 13–24 are the same step with leg B forward
and the arms swapped (redraw with the other leg and arm — NOT a horizontal flip; the character
still faces left). Frame 24 must flow into frame 1 seamlessly.

| Frame | Pose (frames 13–24 = the same with the legs and arms swapped) | Body height |
|---|---|---|
| 1 | Contact: leg A forward, heel just touching the ground; leg B behind, toes on the ground; widest stance | middle |
| 2–3 | Weight moves onto leg A, front knee starts to bend | going down |
| 4 | Down: leg A foot flat, knee bent; leg B heel lifted | LOWEST |
| 5–6 | Leg B toes push off, foot leaves the ground and starts swinging forward | rising |
| 7 | Passing: leg B foot passes beside leg A; leg A straight under the hip | middle |
| 8–9 | Leg B keeps moving forward; leg A heel starts to rise | rising |
| 10 | Up: leg A on the ball of the foot pushing off; leg B reaching forward | HIGHEST |
| 11–12 | Leg B extends forward, foot about to land heel first | going down |
| 13 | Contact with leg B forward (= frame 1 with the legs and arms swapped) | middle |

Reference poses as guides for the legs and body (use them for the look of each phase, not as
exact frames): frame 1 ≈ reference pose 1 (leftmost), frame 4 ≈ pose 2, frame 7 ≈ pose 3,
frame 10 ≈ pose 4, frame 13 ≈ pose 5, frame 16 ≈ pose 6, frame 19 ≈ pose 7, frame 22 ≈ pose 8.
Adjust them where needed so that the foot spacing in section 4 stays even. Do NOT copy the arms
of the reference poses — the arms change as described below.

- Arms — natural swing, opposite to the legs (this is the one planned change from the
  reference; in the reference the same arm swings forward on every step):
  - The arm on the leg-A side is BACK when leg A is forward, and FORWARD when leg B is forward.
    The other arm does the opposite. So at frame 1 one arm is forward and the other back, and at
    frame 13 they have changed places.
  - Largest swing at the contact frames 1 and 13; both arms pass beside the body at the passing
    frames 7 and 19; smooth motion in between (no snapping).
  - Swing from the shoulder with a soft, slightly bent elbow; a bit more bend when the arm is
    forward. Forward reach about the same as the front arm in the reference; the back swing goes
    slightly behind the hip. Relaxed hands, same hand drawing as the reference.
  - Near arm (the one on the camera side) drawn in front of the torso, as in the reference; far
    arm behind the torso, partly hidden — keep this layering the same in every frame.
  - Shoulders and the shirt sleeve follow the arm naturally; the rolled-up sleeves and the bag
    strap stay on the correct arm/shoulder in every frame.
- Vertical bob: smooth (sine-like), lowest at frames 4 and 16, highest at frames 10 and 22, total
  range 8–12 px at this size (the reference has about 11 px). Head, torso and bag move together.
- Bag: rides on the back, follows the body with a slight 1–2 frame lag, bounce at most 6 px; the
  strap stays on the same path across the chest.
- Even spacing: every consecutive pair of frames, including 24 → 1, changes by a similar amount.
  No holds, no duplicate or near-duplicate frames, no sudden jumps. (The old 8-pose sheet had two
  near-duplicate poses, which made the walk stutter — do not repeat that.)

## 4. Feet must not slide (most important)

- Stride: same as the reference. At the contact frames the toe tips of the two shoes are about
  172 px apart (≈ 28 % of body height).
- Ground line: the sole of the supporting foot sits on the same ground line in every frame
  (±1 px). No floating, no sinking.
- While a foot is on the ground (from heel strike to toe-off) it moves BACKWARD (to the right) by
  the same amount every frame: 172 / 12 ≈ 14.3 px per frame (±1.5 px). It must never move forward
  and must not jitter.
- The swinging foot clears the ground around the passing frames (about 10–20 px).

## 5. Quality rules — problems we had before, must not appear

- The head stays attached to the neck and shoulders: no sliding of the head over the collar or
  shoulders between frames.
- No visible seams, cut lines, notches in the shoulder or back outline, ghost or double outlines,
  halos, or semi-transparent holes inside the body.
- Each frame is one solid, connected silhouette. No extra, missing, fused or broken limbs or
  fingers; both shoes the same; far-side limbs correctly behind the body.
- No motion blur, no shadow, no ground, no props, no text, no logo, no watermark on the frames.
- No green in the character and no green fringe on the edges; clean anti-aliased edges.

## 6. Output files

1. `frames/walk_side_01.png` … `frames/walk_side_24.png` — each 384 × 768 px, PNG with a
   transparent background. Same placement in every frame: ground line (sole of the supporting
   foot) at y = 720; centre of the head-and-chest area (top 35 % of the figure) at x = 192;
   character ≈ 617 px tall. Do NOT crop, rescale or re-centre frames one by one.
2. `walk_side_24_sheet.png` — 2304 × 3072 px: the 24 frames in a 6-column × 4-row grid (frame 1
   top-left, reading left to right, top to bottom), each cell 384 × 768 with exactly the same
   placement as above, background pure #00FF00. No labels on this sheet; no figure touches a cell
   border or another figure.
3. `preview_inplace.gif` — the 24 frames looping at about 29 fps, the speed the game will use
   (≈ 35 ms per frame; a GIF stores 1/100 s, so alternate 30 ms and 40 ms).
4. `preview_travel.gif` — the same loop with the character moving left by the measured
   planted-foot distance every frame over a plain floor line; a planted foot must look glued to
   the floor.
5. `contact_sheet.png` — the 24 frames with frame numbers, the ground line (y = 720) and the centre
   line (x = 192) drawn on. For checking only.
6. `qa.json` — for every frame: bounding box, top-of-head y, lowest sole y, which foot is planted,
   x of the planted foot's toe tip, x of the head-and-chest centre.
7. `QA_CHECK.md` — PASS/FAIL with the measured numbers for every rule:
   - 24 frames, all 384 × 768, same placement;
   - ground line to top of head 617 ± 6 px (the bob), bob range 8–12 px with lows at 4/16 and
     highs at 10/22;
   - supporting sole on y = 720 ± 1 px in every frame;
   - planted foot moves right 14.3 ± 1.5 px every frame, never left;
   - head-and-chest centre at x = 192 ± 3 px;
   - arms opposite to the legs: at frames 1 and 13 the forward arm is on the side of the back
     leg, and the two arms have changed places between frame 1 and frame 13;
   - even change between consecutive frames, including 24 → 1 (list the difference for each pair);
   - no green pixels inside the character, one connected silhouette per frame.
   If a rule does not pass, write FAIL with the numbers. Do not mark anything as passing that was
   not measured.
