// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

export default function TradingViewWidget() {
    const contariner = useRef();

    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "symbols": [
            [
              "FXOPEN:XAUUSD|1D"
            ],
            [
              "IDX:COMPOSITE|1D"
            ],
            [
              "FX_IDC:USDIDR|1D"
            ]
          ],
          "chartOnly": false,
          "width": "500",
          "height": "210",
          "locale": "en",
          "colorTheme": "light",
          "autosize": false,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "backgroundColor": "rgba(255, 255, 255, 0)",
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W"
          ]
        }`;
            contariner.current.appendChild(script);
        },
        []
    );

    return (
        <div className="tradingview-widget-container" ref={contariner}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank">
                </a>
            </div>
        </div>
    );
}

memo(TradingViewWidget);
