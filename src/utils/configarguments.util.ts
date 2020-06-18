const ConfigArguments: any = [
  {
    version: 'V1',
    arguments: [
      "-c:v",
      "libvpx-vp9",
      "-c:a",
      "libopus"
    ]
  },
  {
    version: 'V2',
    arguments: [
      "-threads",
      "4",
      "-speed",
      "4",
      "-c:v",
      "libvpx-vp9",
      "-c:a",
      "libopus"
    ]
  },
  {
    version: 'V3',
    arguments: [
      "-speed",
      "4",
      "-threads",
      "3",
      "-c:v",
      "libvpx-vp9",
      "-c:a",
      "libopus"]
  },
  {
    version: 'V4',
    arguments: [
      "-vf",
      "scale=640x480",
      "-b:v",
      "750k",
      "-quality",
      "good",
      "-speed",
      "4",
      "-crf",
      "33",
      "-c:v",
      "libvpx-vp9",
      "-c:a",
      "libopus",
    ]
  },
  {
    version: 'V5',
    arguments: [
      "-quality",
      "realtime",
      "-speed",
      "4",
      "-threads",
      "3",
      "-c:v",
      "libvpx-vp9",
      "-c:a",
      "libopus",
    ]
  },
  {
    version: 'V6',
    arguments: [
      "-vf",
      "scale=640x480",
      "-b:v",
      "750k",
      "-minrate", "375k",
      "-maxrate",
      "1088k",
      "-tile-columns",
      1,
      "-g",
      240,
      "-threads",
      4, 
      "-quality",
      "good",
      "-crf",
      33,
      "-c:v",
      "libvpx-vp9",
      "-c:a",
      "libopus"
    ]
  }
];

export default ConfigArguments;
