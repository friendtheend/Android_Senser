Java.perform(function () {
    console.log("[*] Hook script loaded!");

    // 获取 SensorEventListener 类
    var SensorEventListener = Java.use('android.hardware.SensorEventListener');

    // Hook onSensorChanged 方法
    SensorEventListener.onSensorChanged.implementation = function (event) {
        console.log("[*] onSensorChanged called!");
        console.log("Sensor Type: " + event.sensor.getType());
        console.log("Sensor Values: " + event.values);

        // 调用原始方法
        this.onSensorChanged(event);
    };
});
