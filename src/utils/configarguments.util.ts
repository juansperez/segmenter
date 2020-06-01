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
];

export default ConfigArguments;
