# SIGAP TNI

Whatsapp Bot for reporting

## Requirement

This bot need (Whisper ASR)[https://github.com/ahmetoner/whisper-asr-webservice] to process the audio, please run the container using this command first:

### CPU

```
docker run -d -p 9000:9000 -e ASR_MODEL=base -e ASR_ENGINE=openai_whisper onerahmet/openai-whisper-asr-webservice:latest
```

### GPU

```
docker run -d --gpus all -p 9000:9000 -e ASR_MODEL=base -e ASR_ENGINE=openai_whisper onerahmet/openai-whisper-asr-webservice:latest-gpu
```

## Installation

1. `npm install`
2. `npm start`