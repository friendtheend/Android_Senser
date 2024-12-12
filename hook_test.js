Java.perform(function () {
    console.log("[*] Starting SensorManager Hook...");

    // Hook SensorManager.registerListener
    var SensorManager = Java.use('android.hardware.SensorManager');
    var Sensor = Java.use('android.hardware.Sensor');
    var SensorEventListener = Java.use('android.hardware.SensorEventListener');

    SensorManager.registerListener.overload(
        'android.hardware.SensorEventListener',
        'android.hardware.Sensor',
        'int'
    ).implementation = function (listener, sensor, rate) {
        console.log("[*] registerListener called!");
        console.log("Listener: " + listener);
        console.log("Sensor Type: " + sensor.getType());
        console.log("Sensor Name: " + sensor.getName());
        console.log("Rate: " + rate);

        // 打印调用堆栈，确认调用来源
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));

        // 调用原始方法
        return this.registerListener(listener, sensor, rate);
    };

    // Hook onSensorChanged (optional, for real-time sensor data)
    SensorEventListener.onSensorChanged.implementation = function (event) {
        console.log("[*] onSensorChanged called!");
        console.log("Sensor Type: " + event.sensor.getType());
        console.log("Sensor Values: " + event.values);

        // 调用原始方法
        this.onSensorChanged(event);
    };

    // Hook SensorManager.getDefaultSensor (optional, for initialization tracking)
    SensorManager.getDefaultSensor.overload('int').implementation = function (type) {
        console.log("[*] getDefaultSensor called with type: " + type);
        return this.getDefaultSensor(type);
    };

    // Hook SensorManager.getSensorList (optional, for sensor enumeration)
    SensorManager.getSensorList.overload('int').implementation = function (type) {
        console.log("[*] getSensorList called with type: " + type);
        return this.getSensorList(type);
    };

    console.log("[*] SensorManager Hook Loaded.");
});
