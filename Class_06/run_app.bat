@echo off
set JAVA_HOME=C:\Program Files\Java\jdk-17
set ANDROID_HOME=C:\Users\josed\AppData\Local\Android\Sdk
set PATH=C:\Users\josed\Desktop\class_06\android;%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%PATH%
cd /d C:\Users\josed\Desktop\class_06
npx react-native run-android
pause
