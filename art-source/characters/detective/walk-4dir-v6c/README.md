# DETECTIVE WALK V6c — upper-body vertical timing fix

V6c translates the existing UP/DOWN upper-body layer vertically. The measured head offsets against frame 00 are `0, -4, -12, -16, -12, -4`, repeated for the second step: 16 artwork pixels of bob, with a maximum adjacent change of 8 pixels including the loop seam. The whole head, torso, arms, notebook, bag, strap and shirt tails move together without resampling, horizontal translation, scaling or new rotation.

Left/right sheets and frames, the four idles, all twelve lower-body paintings, registered lower rasters and their registration data are byte-identical to V6b. The retained internal folder name `DETECTIVE_WALK_V6b` and existing file names preserve the package layout. The outer ZIP and manifest identify this release as V6c.

V5 cutout artwork and accepted horizontal leg poses are retained. Up/down use six independently painted lower-body keys per direction; only the lower body is mirrored for the second step.

## Runtime assets

| Direction | Frames | FPS | Sheet grid | Sheet size | Speed |
|---|---:|---:|---|---|---|
| left | 24 | 24 | 6 × 4 | 2688 × 2880 | 220 game px/s |
| right | 24 | 24 | 6 × 4 | 2688 × 2880 | 220 game px/s |
| up | 12 | 12 | 4 × 3 | 1792 × 2160 | 88 game px/s |
| down | 12 | 12 | 4 × 3 | 1792 × 2160 | 88 game px/s |

- `walk_<direction>.png`: RGBA spritesheets, row-major order.
- `frames/<direction>/`: individual 448 × 720 RGBA frames, numbered from 00.
- `idle_<direction>.png`: the four original V5 idles, byte-for-byte unchanged.
- `animation_manifest.json`: frame count, frame rate, grid and speed per direction.
- `ground_test_<direction>_<speed>pps.gif`: fixed-floor movement at game scale, 4 seconds each.
- `comparisons/V5_vs_V6b_<direction>.gif`: original file names retained. UP/DOWN compare V5 with V6c; LEFT/RIGHT retain the original V5/V6b comparison because their animation is unchanged. Four seconds each.
- `preview_<direction>.gif`: one-second repeating stationary animation.
- `contact_sheets/`: numbered frames, red y=660 line and silhouette check. UP/DOWN also have a blue reference line at the K3 hair top (UP y=97; DOWN y=96).
- `QUALITY_CHECK.md` and `.json`: exported-frame template offsets, sole tracks, measured results and methodology.
- `qa/V6c_SHA256_PROOF.json`: paired V6b/V6c SHA-256 values for 139 protected files, including all 54 required runtime files.
- `qa/GIF_sample_frames.png`: samples decoded from the exported comparison GIFs.
- `source/`: runnable renderer, included cutouts, original baseline frames, pose guides, final painted keys, prompt set and raster proof layers.

## Placement in Phaser

The cell is 448 × 720. Ground/anchor y=660, origin `(0.5, 0.916667)`. Reference artwork height is 560 px, displayed at a constant scale `330 / 560`. The near and far feet can occupy different depths around the anchor; reference height does not mean every alpha bounding box is exactly 560 px.

Read `frameCount` and `frameRate` from each direction entry. Up/down run at 12 FPS; left/right at 24 FPS. All cycles last one second and contain two steps.

```js
for (const dir of manifest.directions) {
  this.load.spritesheet(`detective-${dir.id}`, `${baseUrl}/${dir.sheet}`, {
    frameWidth: manifest.frameWidth,
    frameHeight: manifest.frameHeight
  });
}
// After the assets have loaded:
for (const dir of manifest.directions) {
  this.anims.create({
    key: `detective-walk-${dir.id}`,
    frames: this.anims.generateFrameNumbers(`detective-${dir.id}`, {
      start: 0, end: dir.frameCount - 1
    }),
    frameRate: dir.frameRate,
    repeat: -1
  });
}
detective.setOrigin(0.5, 0.916667);
detective.setScale(330 / 560);
```

Use the separate right-facing artwork directly. Keep `flipX` false for all four full-body animations. Drive horizontal movement at 220 px/s and vertical movement at 88 px/s. Handle diagonal movement separately in your game.

## How the hybrid is built

The existing V5 torso is separated into rigid head/core/shirt-tail regions. The head retains its original painting and uses a counter-tilt below one degree. The torso counter-rotates, the free right arm swings 12° with one-frame forearm follow-through, the notebook arm sways about its elbow, and the bag swings 5° with two-frame phase lag. The hem and lower open-shirt tails have one-frame follow-through. Front/back upper-body sway is 4.2 artwork pixels; the head remains horizontally steady.

The side legs use the V5 leg layers in their existing coordinates. Pixels from y=480 downward are copied from the original V5 final frames, preserving the accepted ankle/shoe rendering exactly.

The twelve lower-body paintings were generated individually with built-in ImageGen from the matching idle, a leg pose guide and V5 fabric/shoe references. Each key is registered under the hem. Registration rescales the artwork for the cell, retains jean width, applies lateral placement to the painted legs below the hidden waist and positions the planted sole using measured raster contours. Small cutout-edge fragments are assigned to their connected leg and removed if isolated. This cleanup retains twelve distinct painted keys and does not derive the six poses from one straight-leg image. The second step is an exact horizontal mirror of the registered lower layer only.

The front/back floor-track increment is `88 / 12 × 560 / 330 = 12.444444` artwork px per frame. The contact pair is 75 artwork px apart in depth; raster rounding centres it within half a pixel of y=660.

## Reapply or verify the V6c patch

The PNG sources are included; the patch does not call image generation. Install the Python dependencies from `source/requirements.txt`. From `source/`, run:

```text
python3 patch_v6c.py --previews
python3 quality.py
```

`patch_v6c.py` is idempotent. It accepts the recorded V6b upper rasters or the already patched V6c rasters, verifies their raw RGBA hashes, and applies only an integer Y translation to the whole upper layer. It reconstructs the original lower composite without changing or re-registering the lower rasters. It updates only UP/DOWN frames, sheets and previews, plus release metadata and QA. No new waist extension is needed; the existing overlap covers the join in all 24 frames.

`V6C_PATCH_STATE.json` records the V6b baseline hashes, measured head positions and per-frame row translations. UP needs a one-pixel calibration in a few frames to retain the existing counter-tilt while making the two measured step curves identical. K3 remains at its V6b absolute level. See `QUALITY_CHECK.md` for every applied delta and exported-frame measurement.

The original V6b rig, renderer, assembly and guide scripts remain included for provenance. `assemble.py` is the earlier V6b build entry point and re-registers lower paintings; it is not used for this V6c patch. For a V6c reapply, use the retained PNG caches and the two commands above. `source/build/qa/` contains exported raster part layers used by the measurements. `IMAGEGEN_PROMPTS.json` records the original painting brief; `v5_reference/` holds the original subset needed for comparisons.

Validation covers the exported assets. Integration and save/gameplay behaviour in your actual Phaser project are outside this asset package.
