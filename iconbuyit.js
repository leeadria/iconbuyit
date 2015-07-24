// ==UserScript==
// @name         IconBuyyIt
// @version      0.1
// @description  enter something useful
// @author       jingxuaw@, locheng@, kento@
// @include      http://www.amazon.co.jp/*
// @grant        none
// ==/UserScript==

//debugger;

function CreateImageElement(src) {
    var img = document.createElement('img');
    //img.setAttribute('class', 'iconize');
    img.src = src;
    return img;
}

function CreateIconContainer(features) {
    var iconDiv = document.createElement('div');
    var featureId = 0;
    var colCount = 3;
    for (var row = 0; row < Math.floor((features.length - 1) / colCount) + 1; ++row) {
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'icons');
        for (var col = 0; col < colCount; ++col) {
            if (featureId >= features.length) break;
            var li = document.createElement('li');
            var iconSpan = document.createElement('span');
            iconSpan.appendChild(CreateImageElement(getFeatureURL(features[featureId]["name"])));
            var textSpan = document.createElement('span');
            textSpan.appendChild(document.createTextNode(features[featureId]["val"]));
            li.appendChild(iconSpan);
            li.appendChild(textSpan);
            ul.appendChild(li);
            featureId++;
        }
        iconDiv.appendChild(ul);
    }
    nodeAfter = document.getElementById('bottomRow');
    nodeAfter.parentNode.insertBefore(iconDiv, nodeAfter);
}

function AppendIconizeStyle() {
    var stl = document.createElement('style');
    stl.type = 'text/css';
    var css = document.createTextNode('ul.icons { list-style-type: none; margin: 0px 5px auto 0px; padding: 0 0 30px 0;} ul.icons li { display: inline; padding: 0 10px 0 10px; width: 33.3333%; height: 60px; } ul.icons li span { color: #42454a; border: 1px solid #c9c3ba; padding: 10px; text-decoration: none; width: 115px; height: 100px; }');
    stl.appendChild(css);
    var head = document.getElementsByTagName('head');
    head[0].appendChild(stl);
}

function getFeatureURL(featureName) {
    return "https://github.com/floydSJTU/iconbuyit/raw/master/icons/" + featureName + "_icon.png";
}

function GetFeatureName(attr) {
    switch (attr)
    {
        case "画面サイズ":
            return "display";
        case "HDMIポート数":
            return "total_hdmi_ports";
        case "LANポート数":
            return "total_ethernet_ports";
        case "USBポート数":
            return "total_usb_ports";
        case "外形寸法":
            return "item_dimensions";
        case "本体質量":
            return "item_weight";
        case "電力":
        case "消費電力":
            return "wattage";
        case "コントラスト比":
            return "native_resolution";
    }
    return null;
}

function FeatureNameToURL(featureName) {

    switch (featureName)
    {
        case "display":
            return "tv_screensize";
        case "total_hdmi_ports":
            return "tv_hdmi";
        case "total_ethernet_ports":
            return "tv_hdmi";
        case "total_usb_ports":
            return "tv_hdmi";
        case "item_dimensions":
            return "size";
        case "item_weight":
            return "weight";
        case "wattage":
            return "tv_power";
        case "native_resolution":
            return "tv_resolution";
    }
    return null;
}

function ParseFeatureBullet(lable, value) {
    var featureName = GetFeatureName(lable);

    if (featureName != null) {
        var feature = {};
        feature.val = value;
        feature.name = FeatureNameToURL(featureName);

        return feature;
    } else {
        //console.log("Not country of origin: " + attr);
        return null;
    }
}

function ExtractLabelValue(elem) {
    var text = elem.innerHTML;
    var pair = text.split(/:/);

    if (pair[1] == null) {
        return null;
    }

    var label = pair[0].trim();
    var value = pair[pair.length - 1].trim();

    return [label, value];
}

function ParseFeatureBullets() {
    var featureList = [];
    var elemFeatureBullets = document.getElementById("feature-bullets");
    if (elemFeatureBullets != null) {
        var elemFeatureItems = elemFeatureBullets.getElementsByClassName("a-list-item");
        for (var i = 0; i < elemFeatureItems.length; i++) {
            var labelValue = ExtractLabelValue(elemFeatureItems[i]);
            var elemFeature = ParseFeatureBullet(labelValue[0], labelValue[1]);
            if (elemFeature != null) {
                featureList.push(elemFeature);
            }
        }
    } else {
        console.log("feature-bullets not found");
    }

    return featureList;
}

function ParseProductDetail() {
    var featureList = [];
    var elemProductDetails = document.getElementById("prodDetails");
    if (elemProductDetails != null) {
        var labels = prodDetails.getElementsByClassName("label");
        var values = prodDetails.getElementsByClassName("value");
        for (var i = 0; i < labels.length; i++) {
            //console.log(labels[i] + " : " + values[i]);
            var elemFeature = ParseFeatureBullet(labels[i].innerHTML, values[i].innerHTML);
            if (elemFeature != null) {
                featureList.push(elemFeature);
            }
        }
    } else {
        console.log("feature-bullets not found");
    }

    return featureList;
}

var SableResult = {
    total_ethernet_ports: [
        {
            value: 1
        }
    ],
    total_hdmi_ports: [
        {
            value: 3
        }
    ],
    total_usb_ports: [
        {
            value: 1
        }
    ],
    item_weight: [
        {
            normalized_value: {
                unit: "pounds",
                value: 46.29707502
            },
            unit: "kilograms",
            value: "21d0"
        }
    ],
    item_dimensions: [
        {
            width: {
                normalized_value: {
                    unit: "inches",
                    value: 44.2125983801
                },
                unit: "centimeters",
                value: 112.3
            },
            length: {
                normalized_value: {
                    unit: "inches",
                    value: 11.6141732165
                },
                unit: "centimeters",
                value: 29.5
            },
            height: {
                normalized_value: {
                    unit: "inches",
                    value: 26.9291338308
                },
                unit: "centimeters",
                value: 68.4
            }
        }
    ],
        display: [
            {
                size: [
                    {
                        unit: "inches",
                        value: "46d0"
                    }
                ],
                technology: [
                    {
                        value: "LED",
                        language_tag: "ja_JP"
                    }
                ]
            }
        ],
        wattage: [
            {
                unit: "watts",
                value: "108d0"
            }
        ],
        native_resolution: [
            {
                value: "1920X1080",
                language_tag: "ja_JP"
            }
        ],
};


function ParseSableResult(sableData) {
    var featureList = [];

    console.log(sableData);
    console.log(sableData["total_ethernet_ports"]);

    if (sableData["total_ethernet_ports"] != null) {
        var feature = {};
        feature.name = FeatureNameToURL("total_ethernet_ports");
        feature.value = sableData["total_ethernet_ports"][0].value;
        featureList.push(feature);
    }

    if (sableData["total_hdmi_ports"] != null) {
        var feature = {};
        feature.name = FeatureNameToURL("total_hdmi_ports");
        feature.value = sableData["total_hdmi_ports"][0].value;
        featureList.push(feature);
    }

    if (sableData["total_usb_ports"] != null) {
        var feature = {};
        feature.name = FeatureNameToURL("total_usb_ports");
        feature.value = sableData["total_usb_ports"][0].value;
        featureList.push(feature);
    }

    if (sableData["item_weight"] != null) {
        var feature = {};
        feature.name = FeatureNameToURL("item_weight");
        feature.value = parseInt(sableData["item_weight"][0].value, 16);
        featureList.push(feature);
    }

    if (sableData["item_dimensions"] != null) {
        var feature = {};
        feature.name = FeatureNameToURL("item_dimensions");
        feature.value = sableData["item_dimensions"][0].length.value +
            "x" + sableData["item_dimensions"][0].width.value +
            "x" + sableData["item_dimensions"][0].height.value;
        featureList.push(feature);
    }

    if (sableData["display"] != null) {
        var feature = {};
        feature.name = FeatureNameToURL("display");
        feature.value = parseInt(sableData["display"][0].size[0].value, 16);
        featureList.push(feature);
    }

    if (sableData["wattage"] != null) {
        var feature = {};
        feature.name = FeatureNameToURL("wattage");
        feature.value = parseInt(sableData["wattage"][0].value, 16);
        featureList.push(feature);
    }

    if (sableData["native_resolution"] != null) {
        var feature = {};
        feature.name = FeatureNameToURL("native_resolution");
        feature.value = sableData["native_resolution"][0].value;
        featureList.push(feature);
    }


    return featureList;
}

function change_layout() {
    var prodDetails = document.getElementById('prodDetails');
    prodDetails.parentNode.removeChild(prodDetails);
});

function main () {
    change_layout();
    AppendIconizeStyle();


    //features = [{"name": "weight", "value": "136g"}, {"name": "size", "value": "1.5 * 8.2 * 11cm"}, {"name": "drive_hdd", "value": "100T"}, {"name": "brand", "value": "western_digital"}];


    var feature1 = ParseFeatureBullets();
    var feature2 = ParseProductDetail();
    //var jsonBlock = feature1.concat(feature2)

    //var jsonBlock = ParseSableResult(SableResult);

    CreateIconContainer(feature1.concat(feature2));
    //console.log(jsonBlock);

    //AppendIcon(jsonBlock);
}

main();
