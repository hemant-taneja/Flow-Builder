# Flow-Builder

## Deployed
https://flow-builder-tool.vercel.app/

## Description
A chatbot flow is built by connecting multiple messages together to decide the order of execution.

<img width="1440" alt="image" src="https://github.com/hemant-taneja/Flow-Builder/assets/47469678/68c95918-9c67-443c-83d3-b8fe1d31fad4">

## Features
### Node
This will contain the information about the message and the type of node (currently we are only using **messageNode** but in future we can extend it to different types of nodes like audio, video ). The Node will have a source and a target, only one edge originating from the source but there can be multiple edges having a some target.

<img width="696" alt="image" src="https://github.com/hemant-taneja/Flow-Builder/assets/47469678/6c9f8b09-5b44-4ef4-91f2-ff16c1fba79b">

### SidePanel
This will contain all the different types of nodes that we can drag and drop to the Canvas and make a flow

<img width="370" alt="image" src="https://github.com/hemant-taneja/Flow-Builder/assets/47469678/0c4a2fa8-8004-401a-890c-26f8b75f72b9">

### Settings Panel
This will contain settings related to a particular node

<img width="360" alt="image" src="https://github.com/hemant-taneja/Flow-Builder/assets/47469678/57203d73-19e7-423d-819c-3f5ddf2f430d">

## Save Button
This will save the flow into local storage so as to persist it whenever the user wants to continue again later, flow will only be saved if its a valid one that means all the nodes should be connected via some edge
