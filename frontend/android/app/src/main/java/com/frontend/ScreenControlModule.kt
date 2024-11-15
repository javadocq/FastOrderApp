package com.frontend

import android.content.Context
import android.os.Build
import android.os.PowerManager
import android.util.Log
import android.view.WindowManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ScreenControlModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var wakeLock: PowerManager.WakeLock? = null

    override fun getName(): String {
        return "ScreenControl"
    }

    @ReactMethod
    fun turnScreenOn() {
        val powerManager = reactApplicationContext.getSystemService(Context.POWER_SERVICE) as PowerManager
        if (wakeLock == null) {
            wakeLock = powerManager.newWakeLock(
                PowerManager.PARTIAL_WAKE_LOCK,
                "ScreenControlModule::WakeLock"
            )
            wakeLock?.acquire(10 * 60 * 1000L) // 10분 동안 유지
            Log.d("ScreenControlModule", "WakeLock acquired.")
        } else {
            Log.d("ScreenControlModule", "WakeLock already acquired.")
        }

        val activity = currentActivity
        activity?.runOnUiThread {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
                // Android 8.1 이상에서 잠금 해제 및 화면 켜기 메서드 사용
                activity.setShowWhenLocked(true)
                activity.setTurnScreenOn(true)
                Log.d("ScreenControlModule", "Using setShowWhenLocked and setTurnScreenOn on Android 8.1+")
            } else {
                // 이전 Android 버전 호환용 플래그
                @Suppress("deprecation")
                activity.window?.addFlags(
                    WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                            WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                )
                Log.d("ScreenControlModule", "Using FLAG_SHOW_WHEN_LOCKED and FLAG_TURN_SCREEN_ON on Android <8.1")
            }
        } ?: Log.d("ScreenControlModule", "Current activity is null. Cannot set screen flags.")
    }

    @ReactMethod
    fun releaseWakeLock() {
        wakeLock?.let {
            if (it.isHeld) {
                it.release()
                Log.d("ScreenControlModule", "WakeLock released.")
            } else {
                Log.d("ScreenControlModule", "WakeLock was not held.")
            }
            wakeLock = null
        } ?: Log.d("ScreenControlModule", "WakeLock was already null.")

        val activity = currentActivity
        activity?.runOnUiThread {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
                // 최신 Android 버전에서 화면 설정 해제
                activity.setShowWhenLocked(false)
                activity.setTurnScreenOn(false)
                Log.d("ScreenControlModule", "Cleared setShowWhenLocked and setTurnScreenOn on Android 8.1+")
            } else {
                // 이전 Android 버전 호환용 플래그 해제
                @Suppress("deprecation")
                activity.window?.clearFlags(
                    WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                            WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                )
                Log.d("ScreenControlModule", "Cleared FLAG_SHOW_WHEN_LOCKED and FLAG_TURN_SCREEN_ON on Android <8.1")
            }
        } ?: Log.d("ScreenControlModule", "Current activity is null. Cannot clear screen flags.")
    }
}
