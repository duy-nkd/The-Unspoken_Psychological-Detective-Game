# QUALITY CHECK — V6c upper-body vertical timing patch

**Result: PASS.**

Only the UP/DOWN upper-body raster Y position is changed. Original file names and the `DETECTIVE_WALK_V6b` package folder are retained for drop-in replacement.

## Head-position measurement

Template: exported frame 00, x=160–299 and y=100–199, compared at fixed x using normalized cross-correlation on grayscale RGB. Search dy −32…+32; +dy means lower. Results are measured from the final exported frames, not from the topmost hair pixel or commanded translation.

Requested offsets against frame 00: `0, −4, −12, −16, −12, −4`, repeated for the second step. K3 is the reference upper-body level and is not shifted from V6b.

| Frame | Key | UP offset | DOWN offset | Target |
|---:|---|---:|---:|---:|
| 00 | K0 | +0 | +0 | +0 |
| 01 | K1 | -4 | -4 | -4 |
| 02 | K2 | -12 | -12 | -12 |
| 03 | K3 | -16 | -16 | -16 |
| 04 | K4 | -12 | -12 | -12 |
| 05 | K5 | -4 | -4 | -4 |
| 06 | K0 | +0 | +0 | +0 |
| 07 | K1 | -4 | -4 | -4 |
| 08 | K2 | -12 | -12 | -12 |
| 09 | K3 | -16 | -16 | -16 |
| 10 | K4 | -12 | -12 | -12 |
| 11 | K5 | -4 | -4 | -4 |

| Direction | Template range | Largest adjacent change, including f11→f00 | Hair-top range, secondary only |
|---|---:|---:|---:|
| up | 16 px | 8 px | 15 px |
| down | 16 px | 8 px | 16 px |

Both measured steps are identical. The upper layer is translated by integer rows without resampling, horizontal motion, scale or new rotation. Applied row translations relative to V6b are:

- UP: `[11, -2, 7, 0, -1, 5, 11, -3, 7, 0, -1, 4]`.
- DOWN: `[12, -2, 7, 0, -1, 5, 12, -2, 7, 0, -1, 5]`.

The UP deltas differ by one pixel in a few mirrored-step frames because the retained counter-tilt changes the original head-template match by one pixel. These are whole-layer Y corrections; all original pixels and relative arm/bag/cloth poses are retained. The resulting measured curve is the requested 16/12/4/0/4/12 curve relative to K3.

## Planted soles and waist overlap

Sole positions are read from visible opaque outsole pixels in the final PNGs. Byte-locked per-leg raster masks identify the planted shoe and exclude the other leg; sampled contour pixels must match the final PNG RGB within 5 levels. At least 95% of the bottom-three-row contour must remain visible. Shoes below y=512 are additionally compared pixel-for-pixel to the reconstructed V6b composite.

| Direction | Frames 00–05 | Frames 06–11 | Minimum opaque shirt/jeans overlap |
|---|---|---|---:|
| up | 623, 635, 648, 660, 673, 685 | 623, 635, 648, 660, 673, 685 | 5163 px |
| down | 697, 685, 672, 660, 647, 635 | 697, 685, 672, 660, 647, 635 | 4826 px |

The existing overlap remains sufficient in all 24 frames. No lower-body extension, repaint, rescale, registration change or skin/gap fill is needed. The waist is covered by the retained shirt hem.

## SHA-256 preservation proof

The 54 runtime files below have identical V6b and V6c SHA-256 values. The JSON proof also covers all 12 painted lower keys, all registered lower rasters, the lower registration JSON and per-leg proof layers.

All **139 protected files** match. See `qa/V6c_SHA256_PROOF.json` for paired baseline/export hashes.

| Runtime file | SHA-256 in both V6b and V6c |
|---|---|
| `frames/left/left_00.png` | `95de51f84a3c7a8734af74371f6f842bd4c45dbd87accddd9bc2bf4bcb620140` |
| `frames/left/left_01.png` | `063837c861bdedda53741ad851e147ed23d74a2b95fa7917b140fb6dacf48d25` |
| `frames/left/left_02.png` | `10b5d5e7a493d0e7f7c630d0ff97d89ce537b226c7923309744fba064a9c81ed` |
| `frames/left/left_03.png` | `b1ac0c8b4823eeeab8afa598015bb8ee93599012c38158cc2524eed1b94f515a` |
| `frames/left/left_04.png` | `9482a69a58203a80d9d6660acb0120a0f300507bafb138aabf9ce5b11640c7cd` |
| `frames/left/left_05.png` | `d3fc035e624d6fd4843f1e7395458fdf4866ed01160e9000851899b45bb53ebc` |
| `frames/left/left_06.png` | `115dca2eb187d0b26902742d0fb60350b5ff1a28c2d592352f63980f47633e7e` |
| `frames/left/left_07.png` | `3efc0266c11a4237aa3b99b41ca9d7ca69f999b00eae46dfe44a87b9eeaf08d7` |
| `frames/left/left_08.png` | `fa80187e7948aebba8e24e46a82f9e4ef2c67d6e5d9b476030d9d470f0259f61` |
| `frames/left/left_09.png` | `6bb2212d57fbc009dcd3be6ab30729ae442308f4f01e29a99606b7f5bb02c8aa` |
| `frames/left/left_10.png` | `8e795881694f8491baa08b29d1116cb9c8c642b43a3f5386ea2bdb94b7abbf36` |
| `frames/left/left_11.png` | `3fc5a61a7ca6d358bcb86fbd71ae32e0cfab54167999a326cea20c33c24d0007` |
| `frames/left/left_12.png` | `ebc00be74dce45ab91610641df4db58ae6fd3740ff9881aa3ef20f663fb7035d` |
| `frames/left/left_13.png` | `07bf9b80adb8d97ad168e0f0f8cc049a605067fd41f31c6473c4b3703cd70339` |
| `frames/left/left_14.png` | `f7edd242b5c087a0e1d4976d6ac9903cc887dcfbbd9614ba6cc025f5f09bc6dd` |
| `frames/left/left_15.png` | `7cc3e71af3a9d3a56132c11a1f817ae94454d161e19499bccdbad619e6a6efba` |
| `frames/left/left_16.png` | `839aca8ce101fa798891c095c1e8c280e20d6140b5669e39b66a82a57ac73172` |
| `frames/left/left_17.png` | `b2e17deea479469adcc17b26e272df77555cbfb86610b79d4699db6765a7fc3d` |
| `frames/left/left_18.png` | `dde4908ff21b18719af3fbc57314dadbe865040e0871a7a0bab32d3491944fbc` |
| `frames/left/left_19.png` | `2c23820c9fc0ab13be1bf213c31d52d12e95a42a14b7546e43ca2aa5d5c25f90` |
| `frames/left/left_20.png` | `b57de61bbb5f66c786002fade325ebacc759ba847d6d960b42b3565fe555fa56` |
| `frames/left/left_21.png` | `1c4d8ddd28f5a13da33b12508db567d8a7086fe6c4fb6b38c8528994fdd95872` |
| `frames/left/left_22.png` | `2d77e9f6ea65bca0c41819d81795c70fb447402f72d0c033a4638bef71841df7` |
| `frames/left/left_23.png` | `e9846a7ae0fca4d6ce00021be809f13d9ba0e8658cdd63a1b4532150a2eecf12` |
| `frames/right/right_00.png` | `2b8d9a6757704adc1fdc2301d0dc2b59f98537196e9d4b0cc6aa4c31424a500e` |
| `frames/right/right_01.png` | `f0d08c5dca3ae95df368ccd024dd856d0e2725960150e6267f9faf20a20a2884` |
| `frames/right/right_02.png` | `add68590ca37809adf78d661cc4f27d1b97f821b0c1683242e665958f36472ce` |
| `frames/right/right_03.png` | `bb3b43cf469309bcd6b3c1e4d40d176158d5a37faa61b5ed940bdcfbe87cde9f` |
| `frames/right/right_04.png` | `eaebe50deb654124f579234bd7b522be4a409cecdab4b63d2d1bf6e1a563d6c4` |
| `frames/right/right_05.png` | `6eb1721fa1fceee268848be38440b020705b2230a955eb03b0c83a699335ce3b` |
| `frames/right/right_06.png` | `d1026e714f91b939dc7e5fd3440697edadcb7120dad7870ec464c39fb0f16372` |
| `frames/right/right_07.png` | `ef3ab7580195f71e781ef0adf7cc923ef7fe4cd4e8f6b2fa6c29984b21e0dad0` |
| `frames/right/right_08.png` | `ee0e8d0a5142bfbc8e6f87eb152b16d37edb1e79570669d136dca67618408687` |
| `frames/right/right_09.png` | `c89039c1284123a55fdd9989486e68f21611ec0adc4539d0b1a050f198322f61` |
| `frames/right/right_10.png` | `a2e446be69427e42701e96bc8d424aa4f7cde4a0484ec8c079f010542d439fbb` |
| `frames/right/right_11.png` | `687de689f67fb337bb878fe8af3ce0886e61fce007cf4cdb32e994036d784db6` |
| `frames/right/right_12.png` | `c4d388be5dfee9a251e6a505a76a9667b11dfed9087c035283e3c32500b6cdbd` |
| `frames/right/right_13.png` | `6058c71f4455a03968a535032b0fb9ca44654aff29a17aeae05c3721be6cdd26` |
| `frames/right/right_14.png` | `b01b29556a7c2334b57eee91f8dc993517521285057eda1f8f77bc3f00f403a7` |
| `frames/right/right_15.png` | `59ba35330d6c8823a55bcdfe4b555bb785bd44ac01b7371626b343f40724eda4` |
| `frames/right/right_16.png` | `2be6c6d7512608bbd525c7a0c6fbac7d6a60e6da83e31db510ecc366b9e07e53` |
| `frames/right/right_17.png` | `226fb14cdf1e805867f2b472a50b8128f59fb410ed5574d0026587d21bd6d4dd` |
| `frames/right/right_18.png` | `0945d7e24de167d6a084709b43eb7fe6e2f46996041e951804b5dfb83d27a898` |
| `frames/right/right_19.png` | `639e08e6f94d28afe89f2778fa4d09d33a0945277c35ced0561e6e03d5089358` |
| `frames/right/right_20.png` | `6d4f2dfa3ceca62d1a5c845b38ec774996c98612af00e95b39e98527314a7c76` |
| `frames/right/right_21.png` | `f87cb4735f0baa84d7983471706ee388b5c6b98bbcef2801a768d3c9d3cb0551` |
| `frames/right/right_22.png` | `17009822ba3d6eb15fdf57137059e04b9d8aec1ee27e275a4159d494e9100ad6` |
| `frames/right/right_23.png` | `20c99f48822a3f1aec30455aabda7abc7a05ec84f978a8f99592867b93be6095` |
| `idle_down.png` | `9499bfa4d9ff24cb55b4e243f091102a79deb043031b5a24f57f550a0c1990c6` |
| `idle_left.png` | `787cf55988962edbf61c2dfa48b947d31daa8e1b3f1dd65f9d46dea51d8ae4df` |
| `idle_right.png` | `26837d418f963b71b320e1470345fb03f2a6da4f338a8c74b1abd341ccb9de87` |
| `idle_up.png` | `4fb0bbbf879fe54a7dba6cd8520f584382d4efaa506aa9305c8b2c388803d6b4` |
| `walk_left.png` | `1fd3026b348be6aecf846241bee78dd084507c2e82dbef792b3dbb30488807db` |
| `walk_right.png` | `de9c526a3a4863737aa69ed09cdfd1942b19ab0cf68b5264c0593a1b238d1f00` |

## Export checks

| Check | Result |
|---|---|
| locked_assets_byte_identical | PASS |
| head_template_offsets_within_one_pixel | PASS |
| head_curve_identical_between_steps | PASS |
| head_range_15_to_19 | PASS |
| head_largest_adjacent_change_at_most_8 | PASS |
| sole_tracks_unchanged | PASS |
| sole_contour_visible_in_export | PASS |
| whole_upper_translation_only | PASS |
| leg_pixels_unchanged | PASS |
| waist_overlap_present | PASS |
| atlas_cells_match | PASS |
| frame_counts_rates_origin_speeds_unchanged | PASS |

The UP/DOWN contact sheets contain a red y=660 line and a blue line at the measured K3 hair top. The blue line is a visual reference; head-position QA uses template matching. Ground GIFs and existing comparisons are refreshed only for UP/DOWN; rates remain 12 FPS and speed 88 px/s. Left/right runtime images and the four idles are unmodified.
