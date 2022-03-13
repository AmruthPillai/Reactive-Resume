package me.rxresu.app

import android.content.Intent
import android.net.Uri
import android.webkit.WebView
import android.webkit.WebViewClient

internal class CustomWebViewClient : WebViewClient() {
    override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
        val hostname = "rxresu.me"
        val uri = Uri.parse(url)

        if (uri.host != null && uri.host!!.endsWith(hostname)) {
            return false
        }

        view.context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))

        return true
    }
}
