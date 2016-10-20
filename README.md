DiUS Build-Lights 2.0
=====================

DiUS Build-Lights is a device that provides visual feedback of a Continuous Integration (CI) or Continuous Deployment (CD) status. It polls the CI/CD server and displays the various gate or project status on an LED strip. Each section of the LED strip represents a gate or project, and the colour represents the status of that gate or project. It is an effective way of providing constant visual feedback and it can be very useful in agile software development.

Features:
* Monitors Jenkins web API directly.
* Monitors Jenkins via AWS SQS.
* Plays sound when build finishes.
* Automatically divides LEDs to each build.

![build-lights-top](https://github.com/DiUS/build-lights/blob/master/docs/device_top.jpg)

![build-lights-side](https://github.com/DiUS/build-lights/blob/master/docs/device_side.jpg)

