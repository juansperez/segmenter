const ConfigArguments: any = [
  {
    version: 'V1',
    arguments: [
      "-threads",
      "3",
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
      "3",
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
      "-threads",
      "3",
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
      "-threads",
      "3",
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
      "-threads",
      "3",
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
      "-threads",
      "3",
      "-vf",
      "scale=1280x720",
      "-b:v",
      "1024k",
      "-quality",
      "good",
      "-speed",
      "2",
      "-crf",
      "32",
      "-c:v",
      "libvpx-vp9",
      "-c:a",
      "libopus",
    ]
  },{
    version: 'V7',
    arguments: [
      "-vf",
      "scale=640x480",
      "-b:v",
      "750k",
      "-minrate",
      "375k",
      "-maxrate",
      "1088k",
      "-tile-columns",
      "1",
      "-g",
      "240",
      "-threads",
      "4",
      "-quality",
      "good",
      "-crf",
      "33",
      "-c:v",
      "libvpx-vp9",
      "-c:a",
      "libopus",
      "-pass",
      "2",
      "-speed",
      "4"
    ]
  }
];

export default ConfigArguments;