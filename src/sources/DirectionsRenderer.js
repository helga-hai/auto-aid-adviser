import { MapElementFactory } from 'vue2-google-maps'

export default MapElementFactory({
    name: 'directionsRenderer',
    ctr: () => google.maps.DirectionsRenderer,
    //// The following is optional, but necessary if the constructor takes multiple arguments
    //// e.g. for GroundOverlay
    // ctrArgs: (options, otherProps) => [options],
    events: ['directions_changed'],

    // Mapped Props will automatically set up
    //   this.$watch('propertyName', (v) => instance.setPropertyName(v))
    //
    // If you specify `twoWay`, then it also sets up:
    //   google.maps.event.addListener(instance, 'propertyName_changed', () => {
    //     this.$emit('propertyName_changed', instance.getPropertyName())
    //   })
    //
    // If you specify `noBind`, then neither will be set up. You should manually
    // create your watchers in `afterCreate()`.
    mappedProps: {
        routeIndex: { type: Number },
        options: { type: Object },
        panel: {},
        directions: { type: Object },
        //// If you have a property that comes with a `_changed` event,
        //// you can specify `twoWay` to automatically bind the event, e.g. Map's `zoom`:
        // zoom: {type: Number, twoWay: true}
    },
    // Any other properties you want to bind. Note: Must be in Object notation
    props: {},
    // Actions you want to perform before creating the object instance using the
    // provided constructor (for example, you can modify the `options` object).
    // If you return a promise, execution will suspend until the promise resolves
    beforeCreate(options) {},
    // Actions to perform after creating the object instance.
    afterCreate(directionsRendererInstance) {
        //this.directionsDisplay.setMap(this.$attrs.ref.$mapObject)
        var directionsService = new google.maps.DirectionsService;
        directionsService.route({
            origin: this.$attrs.from ? this.$attrs.from : this.$attrs.to,
            destination: this.$attrs.to ? this.$attrs.to : this.$attrs.from,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsRendererInstance.setDirections(response);
            } else {
                //window.alert('Directions request failed due to ' + status);
            }
        });
        console.log(directionsRendererInstance)
    },
})

//https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyB_nA80Ha1asyGCQtdcgAGZNtd6Vzr8p3A
//{
//     "geocoded_waypoints" : [
//         {
//            "geocoder_status" : "OK",
//            "place_id" : "ChIJpTvG15DL1IkRd8S0KlBVNTI",
//            "types" : [ "locality", "political" ]
//         },
//         {
//            "geocoder_status" : "OK",
//            "place_id" : "ChIJDbdkHFQayUwR7-8fITgxTmU",
//            "types" : [ "locality", "political" ]
//         }
//      ],
//      "routes" : [
//         {
//            "bounds" : {
//               "northeast" : {
//                  "lat" : 45.5022206,
//                  "lng" : -73.56518009999999
//               },
//               "southwest" : {
//                  "lat" : 43.6533096,
//                  "lng" : -79.3833922
//               }
//            },
//            "copyrights" : "Дані карт ©2019 Google",
//            "legs" : [
//               {
//                  "distance" : {
//                     "text" : "541 км",
//                     "value" : 541331
//                  },
//                  "duration" : {
//                     "text" : "5 год 21 хв",
//                     "value" : 19271
//                  },
//                  "end_address" : "Монреаль, Квебек, Канада",
//                  "end_location" : {
//                     "lat" : 45.5017123,
//                     "lng" : -73.5672184
//                  },
//                  "start_address" : "Торонто, Онтаріо, Канада",
//                  "start_location" : {
//                     "lat" : 43.6533096,
//                     "lng" : -79.3827656
//                  },
//                  "steps" : [
//                     {
//                        "distance" : {
//                           "text" : "0,3 км",
//                           "value" : 280
//                        },
//                        "duration" : {
//                           "text" : "1 хв",
//                           "value" : 68
//                        },
//                        "end_location" : {
//                           "lat" : 43.6557259,
//                           "lng" : -79.38373369999999
//                        },
//                        "html_instructions" : "Вирушайте на \u003cb\u003eпівніч\u003c/b\u003e по \u003cb\u003eBay St\u003c/b\u003e у напрямку до \u003cb\u003eHagerman St\u003c/b\u003e",
//                        "polyline" : {
//                           "points" : "e`miGhmocNs@Rm@N]JmA^KBcAXQDUFg@JMD]Le@Xc@H"
//                        },
//                        "start_location" : {
//                           "lat" : 43.6533096,
//                           "lng" : -79.3827656
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "2,5 км",
//                           "value" : 2493
//                        },
//                        "duration" : {
//                           "text" : "8 хв",
//                           "value" : 503
//                        },
//                        "end_location" : {
//                           "lat" : 43.6618361,
//                           "lng" : -79.35452389999999
//                        },
//                        "html_instructions" : "Поверніть \u003cb\u003eправоруч\u003c/b\u003e на \u003cb\u003eDundas St W\u003c/b\u003e",
//                        "maneuver" : "turn-right",
//                        "polyline" : {
//                           "points" : "iomiGhsocNIo@c@oDGg@AASaB[_CGi@E_@EWAGIo@?EAE?EAC?E?A?E?C?E?E@E?I@INgAFc@PkADU@I@E@I?C?C?C?A?C?E?EACAI?EEWKy@WqBYuBWwBg@qDs@wEMgAK_AIw@CQ?EAC?ACICEAECEEEAAIEGEMGKGECECEEGEGIEECCCCAAIKKQIOIOISEQGSCKAGCI?IAEAICSAI?KAI?O?M?Q?G?G@I@Q?I@G?EAE?G?EACAKa@{Ca@oCc@eDEW[wBYwB]eCCSYsBQsAMeA_@qCa@wCa@qC[_CAIWgBe@gDU_BMcAOiAUyAWiB]aCOeAg@kDUuACQ?ICUGs@KaBAUCYEq@KaB"
//                        },
//                        "start_location" : {
//                           "lat" : 43.6557259,
//                           "lng" : -79.38373369999999
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "0,2 км",
//                           "value" : 220
//                        },
//                        "duration" : {
//                           "text" : "1 хв",
//                           "value" : 22
//                        },
//                        "end_location" : {
//                           "lat" : 43.66366379999999,
//                           "lng" : -79.3555052
//                        },
//                        "html_instructions" : "Поверніть \u003cb\u003eліворуч\u003c/b\u003e на з’їзд \u003cb\u003eDon Valley Parkway\u003c/b\u003e",
//                        "maneuver" : "ramp-left",
//                        "polyline" : {
//                           "points" : "ouniGv|icNa@NOHOFKDyAp@cAd@KDOFE@IDODG@KB]JE@C@A@A@A@?BAH"
//                        },
//                        "start_location" : {
//                           "lat" : 43.6618361,
//                           "lng" : -79.35452389999999
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "12,9 км",
//                           "value" : 12897
//                        },
//                        "duration" : {
//                           "text" : "10 хв",
//                           "value" : 595
//                        },
//                        "end_location" : {
//                           "lat" : 43.7628257,
//                           "lng" : -79.33669689999999
//                        },
//                        "html_instructions" : "Приєднайтеся до потоку по \u003cb\u003eDon Valley Pkwy N\u003c/b\u003e",
//                        "maneuver" : "merge",
//                        "polyline" : {
//                           "points" : "{`oiG|bjcNkI~AaF~@q@N_F`AqCh@]Fa@JC?_@H[Ho@PSHa@Nc@P]P[P_@T[RMHUPg@`@m@h@YT_Az@]ZkAdA}BtB{@r@q@b@y@h@A@MF_@RCBq@\\GBGBKFUHe@R]L[JE@a@N_AV_@Hm@LqAXgBZ{@Pc@Fa@FkBVcAJeAH{@Do@DeAFgCLq@DW@cAFs@BI?[@c@?_@AYASAYEIAQAm@MQESGc@OcA][M[I}@]q@Yq@WCAu@Ys@U_AYc@KA?o@Me@I[E[COA]CI?UAa@AW?[?s@As@Aq@Ak@Em@E[EUCC?SCSEWEIA_@IE?SEYIQEa@KUGe@O_@M]Oq@WECWMA?IE[OSK[SMGGESMc@YQKKIEEu@k@g@a@_@[[[WWUUEE]a@[_@QSCAkAyAYa@mB_CqA_B]c@m@s@IM[_@[_@UYy@cAyAgBUYgAuA]c@W]Y_@MQm@aAQ]IOQ_@Se@Sm@Sm@I]EMMo@Ki@G[?EKk@Gm@Gq@?CEg@Cm@A_@Aq@?q@@{@DcAHaB?AFiAHgA@MJ{AP_CNiCHwAD_A@OBu@@yA?m@?GA[Am@C_@C[Em@Eg@Gc@Ik@Kg@AKKc@I[Om@I[O_@Qi@Sc@Ym@MWGIKS[g@a@m@i@s@[e@c@o@m@y@]i@[e@Yc@Q]EIQ[Yo@EKMWKWIQEMa@oAY_A[kAW_AQq@EMIYKa@a@sASi@Uo@A?Wm@_@u@MQMUW_@SUw@_AOO[WSOWQWOUOOI_@OQIm@Sa@K[Ik@KIA]GuDe@w@Is@K}@M}@Ke@IOCMAWG]Iq@Qs@Yg@UWOa@Yc@]]Y]_@]_@Y_@]c@q@aA[g@c@q@gBmCg@u@yBeDk@{@KMOSQWW]UYKMa@c@[WWUWSUOOIIGOIIEEC]MYMUIMCEA]K[G[GUCGAWCOAC?[A_@?U@C?Q@]@SBK@SBUDOBMDWFODIBSHWJIBGB[POHSJSNMH_@XYTUTKJUReAdAGDeBdBIHa@`@e@`@OL]Z_Ar@KFEBOLs@d@YPOJOFKFKHo@Zw@^?@sB`Ay@Z_@LWJKBc@NWFMD[Hi@No@Ny@LUFMBO@UBUBoALiAJC?y@DuAHiADQ?W?E@sA@u@?cBB{CBcABmABsBDe@@A?q@Bw@DoAF]BE@_BLa@BcCTgEf@aALWDE?K?mBToC`@a@Fc@Fq@J]DsC`@a@Do@HSBqBVmAL}@LkAF{BFgA@U?QCkBA_DA_AAe@?Y?i@?a@B[?_@@S?]?]@{DPeAJg@F_@FkBVQBm@J_@DoARw@NSD{@L{@Lq@J[Da@Fu@HkAN}@HkAHeADsAFgAD[@{AF{ADc@B_@@M?qAFK?E@[@aAFaCRE?SBC?q@HoC`@cANI@q@Lm@Je@J_@Hy@PKBs@Ne@LcAVUF]Ja@JeD`AA?_AT_@J_B\\WDK@M?]Fo@Jk@J[F_@FaC^qEp@qDj@{B\\s@J[DOBq@J]D"
//                        },
//                        "start_location" : {
//                           "lat" : 43.66366379999999,
//                           "lng" : -79.3555052
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "1,1 км",
//                           "value" : 1070
//                        },
//                        "duration" : {
//                           "text" : "1 хв",
//                           "value" : 49
//                        },
//                        "end_location" : {
//                           "lat" : 43.7680179,
//                           "lng" : -79.3292728
//                        },
//                        "html_instructions" : "Поверніть на виїзд \u003cb\u003eON-401 E\u003c/b\u003e",
//                        "maneuver" : "ramp-right",
//                        "polyline" : {
//                           "points" : "ulbjGjmfcNQCU?i@@gA@qA@iA@u@?OAE?OAM?aBE}ACeBEM?QAQAMAOCQGMGIECAEEEEGEEEKOEGEGMWGQEOAICIAICKAI?AAI?IAKAW?]A}@AwBA]A}BESAEAIAo@OwCCu@AOImBIsBKiCGmBAOAGAEOa@"
//                        },
//                        "start_location" : {
//                           "lat" : 43.7628257,
//                           "lng" : -79.33669689999999
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "23,0 км",
//                           "value" : 22987
//                        },
//                        "duration" : {
//                           "text" : "12 хв",
//                           "value" : 736
//                        },
//                        "end_location" : {
//                           "lat" : 43.83811679999999,
//                           "lng" : -79.07197540000001
//                        },
//                        "html_instructions" : "Приєднайтеся до потоку по \u003cb\u003eOntario 401 Express\u003c/b\u003e",
//                        "maneuver" : "merge",
//                        "polyline" : {
//                           "points" : "cmcjG|~dcNCkBE{B?ACuBAwBA}@AwBAuBAsEAwCAwCAyB?y@?_AAeHAwC?e@?{@AwC?uA?a@AyA?oCA}A?{@C_BA}@Cy@C{@E{@Cy@I{ACa@Iq@ImAIiAKkAKkAMkAUmBOgASyAm@aEk@}DKs@y@sFSsAk@}Ds@aFCS}@iGKo@Im@WcB_@kCmAkIyBiOe@cDCQa@sCc@sCo@qE_@_CIo@Ii@Gg@eDeUi@qDw@sFi@oDSsASuAeAmHAIQkA]aCiA{HM{@M{@k@yDYsBc@wCe@aD?AIm@OeAS}AG_@M_AAAOsAWkBQkAUkBg@uDQuAK{@OkAOqA]qCQyA[iCc@{D}@{HYiCk@gFcBwOu@{GwDu\\[mCc@aEo@wFe@cEI]AOOgA_AqIWaC]yCWwBm@}Ec@oDCUQoAeAwHq@uE{@wFw@}Eq@eEo@oDO{@y@oEk@uC[aB[_B}@oEWiAe@}Ba@gBa@kB_@cBi@_Ca@_BKe@[oAMe@a@yAW}@Qo@a@oAk@cBa@gAo@eB}@yBa@aAOa@Ym@[q@[o@i@kAmAcCqB}D?Aw@{A_@y@_@{@c@eA{@yBeA{CIWk@kBw@sCU}@s@{CCMUmASaAIg@Mq@a@kCWoBG_@E[I}@OsAI}@Em@MoAAYMqASqCAOMaBAIUqCSqCSiCCQIoAI_AUuCUwCSmCYoDEg@Gw@Eq@AOMqAUyCYwDACm@aIIcA[kEq@uIu@sJQuB[aE[_ECu@yAiRiA}N_BsSoBmWmCq]EUI_AKqAGy@IiAIoAC_@Eq@A[A_@Cw@CoAAiAA_@?q@?m@@a@?{@@i@@s@BcADgADy@B_@B[@[BS@SFq@H{@JgAFg@Hq@Hk@Lw@Hg@Jm@Nu@F_@Pu@^cB\\wAxBwIt@}CXiA^yALc@t@{CRy@d@kBXiA\\sAT}@`@cBZsA^_BTgAPcARmAPoABYHw@JiAHiAJoCB}@BcB?sBC_A?E?c@KuCOwBSmBMmAWaBKg@Mq@Ow@WgAEMMe@i@iBIY[{@e@mAk@qAWg@CEc@{@gAsBoAyBaBoCq@eAkDyF[g@m@aAgAgByA_C_BkCsAwBmAsB]m@k@aAaAeBc@w@Ua@uAgCYg@Wg@y@{AaAmBs@wAa@{@e@_AOY_@y@M[Se@{GaOGKwBaEI_@mC_FWe@Uc@oCaFgC{ECGiCeFoEwIs@wA{BaEoE_ImFmJuEcI_BsCOWy@wAmFoJyBeD}@wAeDmFOW{AcCa@m@uAyBoAqBaAcBw@uACGYi@iA}B{@mBk@yAu@qBy@{BuAuDkDqJOa@wA}D]_A[_AY{@u@uBkDuJaD}I{CkIy@_CwCgICGgDmJSk@IUWo@eB_FuEoM{CmI_BqEiKuYsCcIEKaCyGgA{CgAuCO_@Uk@_@cA_@eAAC?AAA?C@A?G"
//                        },
//                        "start_location" : {
//                           "lat" : 43.7680179,
//                           "lng" : -79.3292728
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "319 км",
//                           "value" : 318841
//                        },
//                        "duration" : {
//                           "text" : "2 год 52 хв",
//                           "value" : 10310
//                        },
//                        "end_location" : {
//                           "lat" : 44.7393229,
//                           "lng" : -75.50066799999999
//                        },
//                        "html_instructions" : "Приєднайтеся до потоку по \u003cb\u003eON-401 E\u003c/b\u003e",
//                        "maneuver" : "merge",
//                        "polyline" : {
//                           "points" : "gcqjGzvraNmAgDm@}AY{@M]k@}Aa@iAe@uAc@mAm@gBe@qA]aAGOe@sAc@kAWu@Wu@i@wAAEe@qAc@oAIWgGuPaGqPaEcL{@}Ba@kAQk@Wy@U}@GSK]Oq@UoAMk@Mu@WqBa@qDMeAq@{FuAoLeBcOG_@qCqU?Ai@aEUsBWsBU_Cm@oFUqB[eC[uCWwBIq@[kCy@_H}@gHOkAm@mEyAoKUaBi@yCYgB}A}JOcAO_As@kEg@{CQkAkBgLG[w@cFYiBw@_Fa@mCa@mCU_B_BkLEWCYESCSCSCS_@uC_@uC}AoLAQiAeKe@sDwAkKg@oDmAkIuAcK}AwJsAwIgBiLkAsHo@{DcBsKESKm@W}AY}AKm@Q}@qBcKqAuGi@iCuAoHo@eD_A}FkAmHOkAwAyKk@uEAIa@{DCKEc@_@aE[eDOmBAQQyBQyBAIWeDScCY{DGq@?Ac@qFk@cH]{EyAeSQ{COiCIqBImEAeC?Q?cC?O?wD@IF_DFcC@q@^gSH_EBoAHeDBoAB{AJqFDqBH}DFwCBiBF_CHqDBcAL}ENuHFeDJaD@o@@oADwAD}A@c@Bi@FwB@y@LcFVwKFsD@WJqFNcH@q@?GDyB@wA?iA?}A?_AA_@A}AEcBEuAGoBKsBKwAK}AM}AQaBUwBWoB[}B]aCWkB[sBQgAGe@]aC_@iCYoBCU[yBk@}DaA{Gw@mFu@mFk@}Dc@}CeAqHw@mFk@}Du@kFmCiRk@}Da@oCu@kFa@oCg@mD_BcLaA{GcAiHwA{JU}AqBoMCQe@mCy@sEUkAWsA[_BcA}EuEwTUgAo@aDEUwA}GgBiIi@qCWgAS_AUuAQcA[}BIc@M_AsByN_@mCa@oCc@}CAEIm@aAsG}B_PWqBCMMw@OgAk@}D[aCKm@qAgJEYy@eG_A}GoCiRc@yCc@gDIk@AGMu@kAmIwGce@g@kDYsBKs@OiAYqBMaACMMgAMo@U}Ba@sE[oEOyCUuFI_FCmACyC?{BFwI?GB_CDoBHyBHmBJcBJaBHiAL_BNiBTuBToBR}AVkBLs@L{@F]^{Bn@cDb@wBJg@Ja@\\yAh@uBr@mC^kApAcE~@kC^aAZw@\\{@Xq@l@wAVg@z@iBJUh@gABEJQJSR_@p@oArA{Bf@w@b@q@xA_CFIdAaBfC}DxAaCHOh@{@v@sAb@}@r@wA`B{Db@iAVq@\\gAh@iB~@qDf@yBXwAb@cC`@oCJ_A^sDV}CPuDB{@DyABuA@qA?y@?gA?}@A}@CuACkAE}@Cm@GsAEo@CYMsBKeB_@uFwAoTWeEy@yLiBaYO{BqA_SIsAaCg^]oFWkEWyDiAaRSuCKaBEm@e@kHy@aMQgCe@eHQsCcA}Oc@oGO{B}A{U]uFkAmQeAqPEo@kAmQ]uF_@gGe@gHQcC[sE?AUiDW{DSsCYeEc@uG_@uF]gFOgCWaEUkD?IIoAe@kHEw@gBiXI}@?MI_ASyBMeAMkAIm@_@gCMu@E][kB[{A?Ca@mBw@aDI[]oAe@aBUs@a@qAe@sAu@qBEK{@wBUm@Sg@{AyDq@gBSg@cGuOeAqCwCsHc@kAeBsEi@qAkB{EeAsCcByEk@gBm@mBQm@{AeFm@wBQk@_B}FYiAoAiFa@aB?Ag@yBQy@EQ{@kE[cBQ}@i@_Ds@gEo@sDQcAc@yCOiAk@sEa@kDIq@Gs@Ec@a@{DO{AQ{BYgDEe@UoCQ{BMkBKgBSqDOeDIsBCq@QsFIsC_@mMc@gNAk@UiHQwFAq@o@wTMeE_@oMu@qUSkHQgGKqDMeEu@iVCwBKqDAa@CoAEwBKeDKo@ACIwBMsEOcFOeFCm@?Cc@_O]yHE}@E{@]eGa@kGWuDI}@q@wHYoCWcCe@eEYaCs@sFIo@m@eFqAiK{@_HqAqKg@}DIq@mBiOi@cEYcCScBe@_E]uCiBcOqAeKy@{GScBqAqKG]cBmNy@qGKy@yAgLYaCQqAaBeNiB{NKy@c@wDgAcJ_CqRiC{SgB_OIo@_@uCQyAs@{F?AGm@iAaJcAiIOsAgA{I{@_HcBgNOkAIo@UmBmAqJCSmAcKc@gD]qCwBgQ_A}Hs@yFo@mFq@qFq@oFQwAi@oEs@sFcAkIsBwPg@_E]sCaB{M}BeRaA_Iw@sGy@uGGe@Io@Gi@Ku@[wBq@cFmAwIc@eDe@cDeAuHcBiMmBiNa@wCIo@a@uCs@gFUgBSwAi@}DIi@u@oFm@qEwByOYqBi@_EOaAS}AwAmK_A}Gu@mFu@oFgAaIE[E[mEw[sBkOu@oF{AaL_BkLe@cDe@iD}@oG_@kCgAoIQmAcD_VOiAoAeJ_A{GgCcRm@gEa@wCGe@k@}DIo@Ga@aAkHsAuJ}@yG{@_Gw@iGM}@Io@s@oFi@_EoBcOAIIo@k@}Dw@uFgCeR}AgL{CyTIo@iAmIiB{M_BmLSyAuBqOUcBKq@iEk[YoBeA_I_@kCq@_Fk@mEKo@kBmNeBeMAE_BmLm@mEoD{WKo@}@}G{CyT_CkQ{@kFO}@Ig@QwAEYi@uD_AeHi@{D{AwKOgAc@eDcBaMqDgXo@kEc@gDCQYuBIk@_@oC_A{GqBaOwAkKs@mFu@mFs@oFk@}D{CcU_@iCAM_@oC_@mCwEo]kAwImE}[iB{MIo@iAmI{DiY_@wCe@mDWoBIo@M{@MkAYmCAKQiBU{BAMOmBQyBIsAIeACc@?ICYM}BSqEYwG}Aq]OmDo@oN_@wH?AWkFIkBGkACk@Ag@Ce@GkBCi@Cq@KgEOwF?EKsEEwAGyACs@GiBU_Fa@gJEs@Cq@EeAGoACo@KaCGcAO{CCi@QyCQkCQmCk@gIG{@Ew@C]AYCq@AOCa@EgAWmFCm@AKGgAQgEE}@E}@IqBIsB[iHc@kKIcB_@_JYcHImB_@{IO}CK{BIwAGeAMyAM}AAGGg@Gu@a@cDWiB]uB_A{F?C_A_GmAiH_BmK]wBWeBES[qBoA{H[iBGc@o@{DgA{GqDcUc@kCc@mCo@{DQmAwEwYe@wCW_BeDkSwB_NoEaYCMaAsGiAiHQqASqAcBoK[wBm@}DKo@gBeLa@oCKo@a@mCIe@AI]}BKy@K}@Iu@KcAAOC]GaAEs@CeAE_B?g@?m@?{@@}@@{@@]@]Bu@FeAFy@HcAH}@Jy@DYFa@T{AFYJi@ZsAb@yBhAcFdAsEjBmIr@uCbBuH~@aEF[`@qB\\kBVyAZwBR_BNqAJaAP_BDo@Da@LaBHuADy@Ds@D{@DiADeABaA@s@@i@@uA@gB?cA?mACsBC}ACcACmACS?WMsCGmAKyAMyASiB]yDOaBWqCGo@a@aEwAsOaAeKWqC[iDQkBOcBUgC_@eDEY[sCKk@Ky@_@cCE]W}AMw@Mw@e@wCY{AOw@uAyGAEi@}Be@yBa@aBm@iCk@gCiAcFAIQw@k@_CaA_EI_@[mA]{AKi@]sAOw@Qw@y@sD{BsJuAiFaAcDAAaA{CeBcFo@eBs@}Au@qAc@s@IM}AsCOWgAoB}AqCy@}AMUQ]OYc@}@]{@ISa@cAi@}Ae@eBYiAOw@EMMs@QaAOiAOgAKeAIeAG_AEw@Ci@CaAA_@A[CyA?aCEqK?y@CcHC}F?yBCcF?eAC{AGgCGyAQ}BKaAAIKy@OmAKw@[oBYmBk@gDEQI]Ke@c@cBEKUy@_@eAQk@o@}AkBgEgAcC]w@u@gB_@w@Wk@w@iBEK_@y@eAcC{AeDe@gAcA{Bq@{As@aBcAeC}@kCs@{By@qCq@mCGU]{AaAqEc@oB_AgEm@sCcAqEq@aDo@qC_@cBS}@_@oBUiAiAyFUeA_AeFUsAMw@]qBKs@M{@U_BQwAYcCOuAOaBOoBQ_CQwCMwCKsBIqDCoAAg@A{BA{D?cA@q@@sBDuCH_DP}FJyC\\iJHkCPcFLkDf@eMB_AFsAPeELaDh@oMHwBJqBDsAHaBJuCFsALcDHiBLwCT}FFgA@SHoBJcBNuBNyA?CNoAXyB\\sBDMRiA^aBTaATw@f@eBt@wBh@wA\\aAL]`BqExAaEJYb@kA`@kAj@_Bf@qAVs@Rq@`@oARu@\\qANo@XsAPy@N{@Ly@Hm@PcAPyAH{@JiAFm@Bc@JoADs@@[Be@DuAB{@?O?QBuA?m@?O?y@A{AAy@C_A?GEiAE_AIwAG{@KsAMwAG{@I{@Gy@MwAI{@KuAMwAWoDMyAKmAAIMwAMaBAQ[qDa@_Fc@sF]cEMaBa@}EYiDUsC?CUmCc@sFI{@c@eFa@kF_@oE_@_FCU]cESiCo@_IcA{LWaDWuC_@oDUcBy@yGaCgRAGcAiIc@gDOmAi@_ECUu@iG]oC}@cHeBoNG_@WqBQuAo@eFg@aEIo@o@kFIo@e@qD_@_Dg@_EAI[kCIi@{@}Gk@uE_@uCc@kDGi@Kw@[cCc@oDg@yDo@_FEa@COm@cFs@wF?Cq@iF_@{Co@}Ei@kEIs@AMm@sEGg@g@}Dk@qEQuAg@aEc@_EQqBYuDO_CYuEGcAUuDAOKoBOyBE}@KqAEu@Eu@OoCAQQkC]}FEq@Ci@WeEUqDGgAASs@{KUgEe@yH[mFWeEYeFGaAc@eHK_BAOEg@c@oHg@eIk@oJaAsPu@aMq@aLQuCGiAY}EQsCI}AKcBc@}GE{@_@{GEs@QsCIqAGqAKcBYwECa@AMCq@YoEc@qHYyEa@uGk@kJ_@mGCUYaFGy@QwCa@gHIeA_@{EKoAOiAc@aEOqAUwBQ{AOsAe@cESkBQiB]aDCUIo@YgCSmBSeBYkCSkBUkBUwBGk@_@iDu@aHMkAc@}Da@qD]cDCU[sCYcCSmBW}BUuBg@oE?GIo@YoCIq@Go@KcAQ{Au@wG[{C]uCo@uFE[c@_Ec@aEmBcQy@mH_CeTcDeZiCuUEYY}BWuB[oBm@}C{@aEEOa@_BOq@qAuFg@yBw@_DkB{G}@yCcAgDa@uAMc@s@_Co@uBs@{B[gAQk@Oe@gAoDwEwO_@mAmG{S[iAQk@IWs@{BcAgDMc@w@iCq@yBk@kB]iAOk@k@iB_@mAc@wAGUQk@Mc@_@mAmA}DIYiAwD}@yCs@}BUy@w@iCEKy@qCaA_Dw@iCe@_Bi@eBe@}A[eA]gAa@sA_@sA?AQk@IUg@qBQs@k@eC_@cBWyAYaBO_A]uBQgAWwA[qBEUc@mC[gBAMw@yEa@cCW_Bs@gE{@iFc@kCG_@}@}Ew@eDOg@Oi@gAgDe@gAgA_Cq@oAu@oAIMU]iBaCaAeAs@u@y@y@c@c@{D{DuIwIuC}CsAkB_BoC{@yAcAmCAEuAmEQy@UeAeAqFqAcHkFeYoAwGAGkAoGcEoTCIkEwU]oBoBkKo@_EUuBCKEc@_@cEe@uFIiAAUCw@IcDWyREqCEcEIqEEaDOkEEkAGo@Gu@[kCa@mC?Ce@wB_@aBe@}Ag@_Bm@}A_@{@Wg@MYy@}AkAgBQWy@gAgB}Bg@m@wCuDaDaEs@{@{@gA}AoB_EcFo@y@eDgEcDcEc@k@w@_AgAuAY_@}EiGsDwEs@}@}AqB[a@KOc@m@]i@AEe@{@_@y@w@{B]iAk@uBSu@SgAe@uCWmBO}AOyBCe@MiCK_DA]WoGMaDGsAYiHIeCUoFSoFM{CQaFIyB_@oHSsCYiDs@aG[yBu@cFAIKu@m@wDSuAOaAqCiRsAkJCOy@mF{Fs_@{@sFUwAsAeI{@_FEMKm@e@_Cc@eBg@wBEMs@cCgCcJw@qCaBwFk@oBiGgToFgRkBsGsE}OGOOk@aAcDa@wAe@aB]iAsAsEWy@q@iBi@yA}@uBoAmCACqAcCoAuB[i@eEwGeHcLeEaHc@q@{BqDkB}Ck@{@U_@{B{DCGwAgCoBcEgAqCKYGO]_A[_AMa@CIsAiEuBuIg@wCo@{D[yBc@{CkBsMkAiIa@mC}BwN_BsIeAiFkCoMiCkMgDiPMm@c@wBYyACOuDqQmAgG]yAYiAIYe@cBc@yAa@qA[_AsByFcCqGg@_B[_ASi@e@sAuB}F_@cAEOy@_CkAiDoUgq@qBgG{@eDw@mEIa@Gg@Kq@E_@Gs@Iy@IkAE_AEs@I{CEcFAy@SqVEmECgEKgP?e@?m@?EAg@SgZEwGGoG?q@Ww\\Aq@AcBGuHKkCAYIcBOqBIu@Ec@Ik@]mBQ{@Ia@g@mCg@cB_@eAk@yAaGuMwA}CyA_DsCsGACcCmFmBeEWg@EI[o@mBeEgByDmB}Do@cBs@sBwCqIqAkDAEQg@?AyAgEaDiJ{AoEcAyC_BwEc@mA}@aCm@aB]aAe@yAmGyQiA{CaCaHo@iBu@{BeCiHg@yA_C{GSm@uBgGyBqGqAqDmAcD_AcCSk@y@wBsAiDGQuAmDEOiCwGmBeFiB{EGQwAwDKWSi@qBkFg@sASi@_EiKcCmGM[m@}AeCyGyB{F{CeI{FgO_BcECESi@}@aCsEuLiFcN_CgG{@{BiC_HeBsEUg@w@uBqAmDACwBuFmBaFwByF_BgEk@{AiCyG_AeCqDmJy@yB{@_Cg@uASq@EOg@aBU{@a@{AEMm@eCS_Ao@}CUoA]uBa@}BCOc@kC{@_Fs@gE_AyFwAuI]qBk@iDe@sCESQeAs@_ECSWuA]sBg@wCg@_Da@aC[kBG]OcAe@mCSgAYgBWsAKm@c@kC?AYaBg@sCUyA]sB[mBUsA]sBSgAQaA]yBWwAc@mCy@yEk@gDk@kDg@yCCKe@mC_@aCuAeIc@iCe@qCq@cE}@gFeAqGs@eEk@eDCSwBiM{@iFgAoGm@qDkB}KW}AMo@]sBc@oCyAqIs@gE?Aa@iC{@mFi@iDIk@EYmAmIyA}Jw@iFwAyJeDaUkA_I}AwKqA{IkA}Hk@}DKo@i@sDu@gF{@aGeAcH{CgSw@eFc@yCMw@Ko@cA{Gi@oDwAgJw@kFc@uCwAoJu@aF[mBKo@iAyG?C}AmJgAyG_AuFe@oCm@{DKi@yB{MM{@WuAUyAEUc@mC]qB_A{FG]My@aA}F]sB_A}FUuAk@iDCOm@wDKg@QeAWsAMu@Ow@Oy@Mu@WuAe@kC]qBOw@Ow@]qB}@aFKo@qC_Pc@eCiA_HEQoAwHi@eDE]Kk@mCkPoAqHiAaHeCiOqAaI}@mFmAoHSiAUqA]sBKc@UeAEWg@{BaCcK_AsDi@oBg@_Bi@cBk@kB_BcF]gAa@sAe@{AOg@Qi@kAqDgB_GQk@KYUw@Yy@_@kAQk@mBaGQk@s@yByD}La@qAkBaGQm@wAsEUu@Ma@IYo@aCc@aBi@yBU_A}@aEAEYyAc@_Ca@wBy@uEYcBa@qC_@iCKq@{@yF]}BeAyGoBsM}AiKIo@[qByAuJq@yEsBcNKo@M_AaBqKqAwIc@wCkAwHo@iEIo@m@yDEYu@_F{@{FcA}Gi@sDcCmPg@gDwAkJo@oEKm@EWqAyImBoM_BsK?AcA{G]wBq@{EUyAw@mF[mBaBwKAEkEwYmA_I}AoKEQy@eGu@aF?AKo@u@aFM{@s@_F_AqGU_BCYIq@Iq@MyAKiAM_BIqAEq@GsAImBEwAAkAMaF?eG@u@@m@F_CH}B@i@Bk@ZgFToCLaAb@yDb@_Dn@uDX{Av@sDrBgJBIv@wD|@eEbAwEx@wDj@iCZ{An@yDh@wDJy@RgBP}AXaDRaD@OPqDHcEBeC?i@@yACaDAcAA_AEaBEeAGaBIcBAWIgBKeAQeCq@gJ_AmMwAwRkAgPq@eJ_@cF]sEu@}JgAmOIaAkBeWmCk_@SsCMaBEo@w@kKEo@i@gHQaCMsBYeEWeDWeDmAcPMaBGo@SqCwAaSM_Bk@aIc@oGGs@_BgTc@}FgAeOyAwSa@uFY{Dq@gJ_@}E]mEkBkWm@yIo@wI}AqTSkCGy@K_BM}AO{BSmCSsC[cEwEip@YeEUsCEo@a@wFoEon@qA}PCWYeEEq@e@gHGq@}AuUq@gJMaB[yD?Ig@gHSsCa@wFqBeYGq@y@qLo@yISsCs@iKo@uI{A{SyCqa@y@sKGq@yAcROkCyAqTiA{O{@{LsAqRuAaSC_@c@gGg@gHiA}O_@uFiGc|@OsBGq@aAqMcBqTsAcQqAoQiAmP{@gLg@eHEg@aA_Na@wF_BqTo@yImBeYSsCSuCuAaSEq@_@uFm@yI]aFIeAa@uFsDqg@iCq^iDoe@OqBCa@Gq@a@uFi@gHEo@Gq@w@iKoA}PiAsNIy@MaBEq@YsDS{COkBIgASqCWkDM_BQsCYmDYwDEk@Q}Bk@kIYsD[kEO{AA?[qCIw@My@My@SsA]mBQ{@YuAa@kBMc@Mm@o@eCaA{D[oAI]GU{@gDe@kBo@eCg@mBe@kBe@kBGUS{@Sw@e@kBoCuKA?Om@]uA[qAUw@c@iBcA_Eo@eC[qAy@aDe@kBaC}IwAoF{@aDKa@Qk@g@oBq@cC[qAi@mBy@_DQu@]qAuAqFeA_Ey@aD_@{AoByHaAuDI_@EOy@eDmAaFS{@IYQu@WqA_@qBSuAYsBKcACSIy@G{@Gy@Eo@G_AGuAEgACyACyA?{A?[@}@@yABo@@k@FwADy@@IDs@PwBJwADc@BWLyAHw@H_AFy@LwAHy@?AFy@NwA?AFy@LwAF{@B_@Fw@H{AFy@FyAD{@@_@Bw@FuDDiEA[?aEEqBEyAGaCMeCQqCOiBM{AO}AOuAOcACWEWOcA[oBo@iDiAmFEQMo@Oy@g@}B_@iB}BaLw@yDG[eA{E{DiRuHg_@Y{ASeAO}@QkAGc@]eCQaBMkA]uDOuBO_C?KIcBI{BAkAEkBCkC?AEkFWi[A_AMeMGgJAs@AeBGgGK_NAgBE{DEwDEcCCsAG}BEwAGcAMiCQgDQgDEy@IyAk@kKe@eJCq@]uGm@aLUuEk@wKMyBMkCc@gIA][cG]qG]iHg@uJCe@Cc@OuCQ_EEcAK_CG}BEuAIcDCkAMiHKsHQwJOiKIiEIgFASGyFE{CIuFCoBOsKIeHM_KOuKI}GCeAMkIK{IMuIOqJCqBEcBIyFGaDKgIAKAuAAq@CcBSeOAsAIoFIeFGuDAeAEaCCeBCcBEgCK_FMkHEmCAq@EuCAq@CeBAo@Aq@EwCAq@M}I?OGyDGoEMwIMeKC}@QcMKcGEmDMmIMmHCgAUcMOaIOmICqBGsD?KEsC?KE{DIeFU{NGoEA_AQuL?KGuEGqDCiCCkBAgBEgEIaLImJEwEEsEC}AEoDEyBSwNYeS?EGiDKoHEuCIsEKyEAq@IwDIoE[eNCiAEcCKuEOmHEsCGuBQoI]}Qa@sQSoJOqFQeHG_CMeG?AE_BWaMC{@ImEMuFUgMIqEm@{ZKuFEeBCcB_@kR?YWkMCiAIyEMmHUmNE{BCm@GcBKuC[gH?CYiH_@cJ[kHQ_ESaFWmGSoEQaE?M]iIQqEYoHMoDCwA?}@?MEaEAsE?m@Aq@?s@CuEAwBA{A?wBAuC?uDAoE?oGAuFAkGCsE?iACgDCoGAsDCqFCsF?y@EkHEiIAeDAiCEeK?WCoHCyEAuAAeAI_DMkEGsBIwBUcGOaFQuE[gJEgACq@KkCOoEIiCIoBc@wM]yJOuEGuAo@wQCq@WyHMwDm@kQEoBGoDAkAE{IGiS?qA?_I?}ICwY?wHA}DAiE?q@E{Q?q@Aq@EuVA}FCuIA{DAwGAeCAwCAcFAcFAqC?oA?kDAaA?sA?q@AwB?sAAkAGqBIsBMyAC[KkAMkAYoBIe@SgAI[s@uCWcAUs@c@sAw@cCe@iBWiAA?Km@S_AYqBOkAW{CMsBGsBCkA?OAq@?M@mA?G@cA@{@Dw@JqBDg@NiBFi@@I\\kCZaBVqA^{A|@_DRi@Ne@N_@p@{AlIiQTg@|DuI^u@Ta@pBmEP_@d@qAPe@Rk@ZcARq@BO\\wAj@iC\\yA@Cn@qCH_@^_BFYHYx@oDLg@vBmJjAmFJc@d@oBZuAf@uBxC}MdEiRT_Ah@eCt@yCf@yBd@wBR_ALy@XgB@KJo@RuAR}AT{BPuBV_DJeBDc@HmA?GNqBRwDVmELwBH{AHuA^kH`@iHDs@RaELeBBk@PyBXqC\\uC|@cGpA{HDSJm@f@kCr@{Df@qCjC}NDWzAuIjBkKv@eEz@uE^qB\\sB~@mFd@oCTqARiAh@wC^yBRyALw@D]D_@F_@Hw@H{@J{@Hy@F_AH}@F}@HwADy@D}@D{@?ABq@?KB}@D}@TyHBq@HcCJ{DPkGX}J@SLsDPyFBgABgAXoIJmCBuB?CAqBEgBGoBOwBEe@KeAUgBOeAIe@SgAYqA_@}AOk@So@]gAWs@Qg@a@eAGMg@kAw@mBsCwGuF}Mw@gB}@yBkAsC}AsDEMsByEQa@_CsFSe@gBeEM[Um@Wo@Us@Us@Oe@g@qBIa@Ou@Ie@_@_CmCuQiAwHGc@_@_CCQ]aC_@kCYqBWcBAIo@kEi@mD[sBCSc@wCo@gEg@kD{@iF_@kCYeBEWw@uFUwAUuAe@cDs@{EQkAkA_Ii@qDG[[{BCSa@iC_@gCM{@YoBQmAc@sCa@qCIe@Im@U{ASqAQiAKy@a@kC]{BCUw@oFQkA[qB{@uFy@{F]_Cq@mEGa@Ks@UyAMy@My@Ow@Ow@Ou@Ou@Os@Qu@Qs@Qq@Su@AAQq@Sq@Uu@Wu@_@mAeA{C}@aCYu@c@mAe@oAWs@Ys@Ws@i@wA]_Ae@kAWs@Wq@Wq@Wq@Wq@c@kA_@aA]}@c@kAM]Uk@Ys@uAqDGOg@sAo@aBKYq@eBo@cBEKi@wAy@}B}@}Bc@iAWo@Yo@Yo@[m@[k@]k@]g@o@_A_@e@_@e@a@c@a@c@c@a@c@a@c@]e@_@e@]EC]UmAs@UOw@e@oBgAaAm@mAu@y@g@i@[QKy@m@w@m@a@_@e@c@]]UWOQKKW[]e@a@g@_@k@k@}@IMc@u@i@gAOYIQ[s@O_@Sg@Oa@K]GQw@qBc@kA?ASi@Qc@oAmDCEOc@mAgD]_AiB_FaDuIe@sA{AsEeAsCIWM_@{CmI}@cCCGSi@gByEqAsDyFwOEMgIwTaBuEcCuGy@uBSg@eAqCeAsC_@iAa@mA]kA]oA[oAc@iBc@qBe@cCMu@[qBa@sCCWQqAQ_BQiBo@sGiEod@q@gHUgCm@uGsAuOkAmMGq@MmAAS{AyOI}@}ByVk@{Fk@wFa@gEOyASyBYeDAEMmBOsBMwBMqBAc@Eq@Cc@KoCWkG[cII}B?ACo@o@ePW{HQmF_@wIUaHM_DOsDIgBe@iKEqAe@sJE}@Cq@]wJO_FCq@Cq@[cJO_ECq@GeBGaBOgEE}@Ce@Cq@_@yICu@I_BGgBSgEGcAA]Cq@IcBKcCEcAe@wLM}CCq@Cq@u@oRCYa@mKEq@?SEoACe@EwBGoCAq@AM?c@KyFAs@C_CAUCcBAq@?EGsDGkEEyEASEuDGoCEwBEwA?GCq@Ca@EuAGyAIwAMsCk@wLUkEUkEOuCCYAUOyCCm@c@mJWgFIcBGkAQkDOwCI_BOiCQoDSwDAQIqAOsC?CMqCEq@GcAA_@Cq@I_BCs@Cq@AOUmFMqCEy@OqDS_EEiAK}BMkCE{@QoDAUQ{CCk@]uGg@_JKqBSsDc@_J[gGc@cJk@yKa@eIMyCAUMqD[aK?MO}EIuDIqCOyFEcBI}CCk@EcBOyFQqGCs@Cs@KgEG}AOoEEwAE{@IuASsCI}@CYIw@SiBQ}ASsACU]yBc@iCG[_@mBk@eCYqAm@gCm@eCiAwEcBeHw@aDiAuES}@o@gCMm@Ss@iCsKwB{Ik@}By@iDeBgHk@gCWuA]mCMaA_@kCQsAOwA]kDUoCk@aH[{D{@kK_B}RMwAgBwTkAsNSmCGq@KgA_@_FOeBw@{JSeCKiA]iEQsBYoDUsCKwAIy@SiCM}AOgBe@uFc@uFe@uFEo@SaCQwBKwAkBeUM}Ae@wFUwC[oDYmDOsBGs@IeAKuAC[Ec@Ey@IuAAQCm@GsAC_ACu@Ac@CsAAe@AwA?y@?{@?{@?mABgB@c@?M@g@B}@Bo@@a@F}ABy@D{@F}@Bg@@OF{@J{APuBPeBHy@Hm@BSL}@F]LaAHe@DWJe@n@gD\\mBTmALy@DYF_@L{@PwAPqBB_@BYBe@@SHwB@y@B_A@wB@eA?S@uCHuODiH@yCBgEF_LDcE?oC?_@?aA?{@C{AAs@?EC}@Cy@Ey@E_AKuAIeAEe@KeAGc@Io@Ec@QkAUsAUuA_@qBaAgFoBuKKo@mAyGKm@s@{DMm@mA_HyAcIKm@e@mCY{AiFmY_AiFMu@_AcFY}AKi@s@}DY_BMk@?C]cBg@iCa@mBEUUaAUgAWqAg@yBCKKa@y@uD_@{AUaA[sA[kAo@eCSs@e@iBi@oBEQIY[gAi@oBOe@c@{AuAwEEMK[qAgEEKOi@gAqDQk@Wy@sAoEsAmE{AcFqAmE_BkFa@sA_FkP}ByHo@uBy@oC_CyHEOeB{FUu@Qk@w@gCuBcHaC{Hs@cCa@uA_DkKQi@oDsL[eAmA_EeAoDMa@yBkH}@wCo@wBgAqDeByFi@gBQk@Uw@{AaFi@eB[gAi@eBIYGQkC_JgDaLY_AQk@uBgHcDyK{BqHwA{EaEaNiBgGEOqAqEg@iBAEg@kBi@_Cc@mBa@kBYsAYqAScACOg@kC]mBO}@i@gDYsB?AKo@E_@YsBQ}AIo@[qCMmAU{B[kDc@}FMeCOwCKcBIiBKeDG_CEwAGsDCwBCsC?wC?oD@wBBsD@y@By@@_AFqCB{ABwAFkCLyFDeBJyFR_JLwGT}JVcMP_J@a@DwBDuB?wA?}@?iAAiBAyACsAK{CGwA?EEq@E_AQeCSeCSwBAKSeBYwBi@{D_@qCg@oDAE}@sGOcAIo@My@i@uDIi@?Ee@gDg@gDQuAy@wF]aCe@cDw@{FKo@u@oFu@oFw@oFE]EUE]CUKs@y@cGq@{EO_AIo@M}@QqAk@_EsB_OcAeH?Gm@qDg@cDs@gF_@kCc@qC_@oBa@mBSu@K]e@cBa@sA_@gAGKSm@Qe@GQYo@Yo@CGWg@Q]e@}@MU{D{Gy@sAWc@i@}@aCaEAAUc@mBqDGKYc@e@y@iAkBiAkBwAaCo@eAi@}@{@uAm@gAYc@yAeCwAaCuAaCoAuBYe@y@uAaA_BEIQYg@}@{@wAy@wAMSWe@q@kA[m@e@cAc@{@_@{@c@cAYu@ISc@iAa@iAQk@M_@a@oASs@]mAGSMe@YmA[qAa@oBi@kCAIYaBg@kCm@eDKm@Km@Mo@WwA]kB]kBWsAWuAa@iBUaA[gAMc@Og@Us@a@iAq@}Ae@eA[q@g@aA]k@_@m@wBiD{A_C{@oAYc@S[CEi@w@}@uA{@qA{@sA{A_CkBsCiBqC}@sAUc@S]{A}BiAgB}AaCyA{Bm@_A}@sAkAiB{@sAAA{@sAm@_A{@qA}@uAm@}@y@oAq@eAYa@e@m@OSa@g@s@{@eAgAMOc@a@u@q@y@o@u@k@q@k@w@i@]WIGw@k@w@o@u@m@c@a@s@o@u@u@k@m@IISS]_@_@e@cAmAGK[_@KMMSa@i@m@}@m@}@[i@AAOUGMS[i@aA]o@[m@[m@Yo@Yk@Yo@[s@Ui@q@eBo@_B_A}Bq@aBgAqCc@iAcBeE_BaEiAuCkAsCUm@o@{Ao@}ASe@_AuBCEs@wAMUYk@AAi@aAMUMUWc@EE]k@kAeBw@eAyBqCiDyD{@aA[_@_AeAq@u@sA}Ay@}@W[uA_By@_AY]_AgAc@e@u@u@a@a@QO[W[Ww@m@iAs@{@c@UMc@SsAg@k@SQGEAw@SgB_@}D}@yHgBcH_BOEkDw@}EgAGCyFqA{D_A{D}@mA[q@QcDu@aHcBsCs@}@SUGy@Si@MQGYGGCu@SSESGe@Oi@SgBq@e@S{@a@A?_@Q_@Se@Uq@_@k@]CC[QgAu@eAw@}AkA_EyCaGsEKIgDgCmCqBoCuB{C}BQOqCsByAiAmA}@}EqDwCyB{AkAyAiAkA{@{AiAkA}@YUkCoBoFcEw@m@_@YWSwAgAWS{AkAKI_Au@kCqBaAu@cCmBeCkB_DcCyI{GaAs@_BmAiBuAi@a@aCiBk@c@aAu@sAeAo@i@MKmBcBs@o@]YaA{@qCeCQQu@o@kBcBiBaBaDuCEEmCaC{BqByAqAu@q@iAcAa@_@u@q@A?yAsAkAiAaA_AkCoCaAeASUGG_CkCuBcCaGwGeG}GIKqGiHkCyCq@u@GImAqAeBqBaAgAeAkAiAsAo@q@_AeAcH_I]_@eEwE[_@sA{AuA_B[_@q@y@]]eAkAqAyA{AcBiF_GSUgE}E[_@GGgCoCiFgFA?[]sBuBw@w@wAuACCuBgBuAuAwCyCoEsEy@y@gBiBs@u@mAoA_A}@u@w@a@c@kAmAqBqBwAwAo@q@UWOOgAgAyB{BsBuBW[YYUYQUW[MSIM]i@_@q@Yk@Yo@KYUm@Wu@Su@IYSw@G]GWG[OaAa@cD]sCUcBIm@?Ao@cFiA}I]sCc@iD]qCYuBqDyYa@_DQsAi@kEUgBKs@]qCw@sGM}@Gq@ACEa@I{@IeAEk@Ca@AUKgCEiA?QCaCAyA@uBB{ADuALiC@GNwBPuBNcBJkARwB\\mDrAsNr@uHJgAHcAF{@Dm@@MFcAFeBBcB?eA?o@?ACsACaAEo@Ck@IgAG_ACQGo@SwAO_AIg@CMIa@Os@Qu@]oAe@{AsAaEqAyDw@aCQi@y@aCQi@}AwEk@cBkAkDQi@w@aCSi@w@_CuEiNq@oBIUISi@{AaAiCg@mAs@_ByA_Ds@qAEK{@wAy@sA]i@q@aAo@}@o@{@q@s@c@c@c@a@y@o@y@i@w@a@]O[Kk@Qe@MaAQaAKy@Em@Ac@@U?q@BuCHaELs@BoCHyEPwNf@sCJc@@mHTsELmBBsA?yAC_AEA?{@GqAICAuAQmAQgASsAY[GmAYsAa@qAa@uAi@mAg@{@_@m@[{Aw@mAs@s@c@k@a@aAq@UQWSy@q@s@m@u@s@iAeAaAeAa@e@eAmAoAaB_AuAe@u@e@u@Ua@Wc@eAkB{B}DUa@y@{A_D{FyB_EsDwG{IaPaDyF}K_SuF}JyDaHcB}CkAqBMS{@uAm@{@_AsAq@{@a@g@qA{AwA{AWWm@m@oBeBw@o@wAgA}@k@mBiAyAy@_@Sg@U[Os@[{@_@yAi@kEcBcC}@ECkEaBa@OeBq@yLsEo@WyBy@s@Yq@YyB}@MG]QA?_@SmAs@YSYQ}@q@iA}@u@q@s@s@SS}AgBW[q@y@oEyFs@aASY[c@k@_Am@gAu@yAaAuBe@gAWs@O_@_AgC]{@y@}BgAwCg@qAqDyJi@uAiBaFaAeCaBsEaGcPwB{FSi@g@uAaBoEs@mB}@cCaAiCe@qA{@sB[o@s@}A}@eBUc@iAqBq@gAoAmBEEAAQSa@c@e@k@oAsBcBgCkAiBk@w@[c@kKePIMe@q@S[e@u@Wc@{BmDaDqEQYQWkAeBeA_B{@qAQYq@gAgBkC{@sA_B_CyBaDe@o@_AsAoAmBWa@Yc@u@kAq@aAWc@k@y@oAqB_@k@a@i@a@o@m@_Ao@aAiAeBgAaBa@q@gAaBWa@MSmAiBq@cA_FsHu@oAwHiLw@gAEGi@s@mBwCcA}AoAuBgBiCaBeCsAmBs@iAgAiBQY}BeEgAuBWe@Ue@Yi@k@gAi@eAs@sA_EaIaAkBMUeBiDGMeIyOqDgHa@y@wCyFcDmGUc@sCuF_@u@}CaGcDmGKSmAcCs@sAgAqBuAoCmBsDaAiBiAyBIMuAkCm@kAg@cAkA{BKSsAkCgB_DWa@q@gAyAuB_@g@}@iAeAqAi@m@i@i@s@u@wAsAo@i@{@u@}AsAiAaAmBaBwDcDkBaBs@o@{A{AsAyAcC{CIKsAoBqAqBgBqCm@cAwA{BgBuC_@m@aA{AqBcDoAoBwAaCW_@cAaBkAiBy@sAa@o@q@eA[i@MS{BoD{EuHMSm@aAQU]k@{@sAm@aAWa@S[mAmBu@mAq@eAeIsMoD}EcN{PwGkIW[{@gAo@y@}BsCmA{As@}@mA}AcAoAe@o@Y]q@}@Y]mBeCoAaBu@aAw@eAiAuAqAcBi@o@SWo@w@aHwIiDkEgByBa@g@uE}FwFcH[a@{EcGwMuP_CuCyBoCaC{CaCyCkEqFgC_DkFsGkEqFs@}@m@u@y@eAoOsR[_@]e@kB_CcJgLiCaDoCkDCEW[oGeIaFiGeAsAuHqJiB_C{CyDcBwBcBwBy@cAEGgFsG_AkA_EeF[_@kEsFgEmFa@i@[_@iCcDmBaCo@w@uAgBoA}AoA}Ac@i@]e@aAkAs@_A_CwCII}IcLa@g@OSoJuLgCcDgAuAqA}Aa@k@o@w@q@y@q@{@m@w@sAcBq@{@q@y@_@g@q@y@Y_@U[CCo@y@[c@SW[c@OU_@i@[g@c@u@EGQ[A?i@aA[m@i@cA]q@Yk@Ym@c@cACGWo@e@mAWq@Um@Yw@Us@Sm@Ww@I[Sq@Uw@I]YgAU}@GYYmAWqAYyAAA[iBa@mC]uBYoB[sBSkAOcA[mBSwAESGa@U{AOaAIi@UyA[kBU{AKu@UyASqAUyA[mBSuACQW_BW_BKo@[sBa@mCG[Ko@Gc@M{@Ko@AG[sBWsAUoAQy@I_@Oq@[uA?ASu@YkAi@iB_@oAQg@Mc@c@oAc@kA[y@Yu@Se@Yo@c@eA[o@]q@[m@[m@[m@KO]o@k@aAaBoCgKaQo@eAoEuH_@m@Wc@iHwL{BwDmCqEgB{CmDaGwBoDu@qAmAsByAeCmAuBi@y@k@cAk@aAS[sA}BMSeBsCqBgDIKeEeHU_@EGYg@{AeCo@iAuFqJaBsCqDgG"
//                        },
//                        "start_location" : {
//                           "lat" : 43.83811679999999,
//                           "lng" : -79.07197540000001
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "109 км",
//                           "value" : 108807
//                        },
//                        "duration" : {
//                           "text" : "1 год 0 хв",
//                           "value" : 3608
//                        },
//                        "end_location" : {
//                           "lat" : 45.2083667,
//                           "lng" : -74.3482841
//                        },
//                        "html_instructions" : "На роздоріжжі тримайтеся \u003cb\u003eліворуч\u003c/b\u003e, щоб залишитися на \u003cb\u003eON-401 E\u003c/b\u003e",
//                        "maneuver" : "fork-left",
//                        "polyline" : {
//                           "points" : "wcapGdfykMgEiHYc@CES_@cBqCiKkQqJePYg@aI{MwBqDCEqBiDIMWe@{BwDwFmJyBsD]o@mJ{OyHqMQYEIKOMS_@q@[q@eBwCkCgEa@q@EI_@o@mAmBg@y@MUm@cAw@sA_@m@]k@{@yAoCaFeCgEqCsEWa@gAaBEIgBeCmB{BwA}AiBiBqC_CUQ[WECk@c@aAo@}@k@aAi@y@c@[OMG}DoBcCmAkAk@}@c@s@[SKmAm@UK_@QcAg@{E_CiCqAwBcAoAm@aCmAi@WiBy@kB}@_Ae@sAq@_Ae@}@g@}@i@}@m@cBmAmAcAg@c@g@a@_@_@[Wy@w@g@g@w@{@w@}@oAyAu@gAo@}@i@y@k@_AcA}AcAqBkAuBWe@_@u@aBwCwAkCcCuEsByDiBgDqBsDoAaCk@cAo@mAiC{EoBqDgG}Kw@yA_AcBcGaL_AeB{Po[wCqFyJ{Q}EaJgAsBWe@yCsFsAgCwAkCu@wAaD_GyQ_]uB}DkC}EmDqGcDeG}AwCoCcF{GgMoCcFmHaNm@kAIOk@eAcB_DACiAuB{@_BIM]m@cBeDsD_HcB_DKQuByDaAiBm@gAqAcCm@iAc@y@eAsBCEgBeDmCcFcB}CmA}BEGq@oAq@qAmAyBg@_AsAaCcCsEwDeHq@oAq@mAo@oAqBuDcAiBo@mAqA_CoA_Cs@sAkBmDqBsDaB}CMSGKkAaCsB}DoAaCAAqBuDqCkFwFeKOY}AwCeCsE_DaGmCcFg@_AsDcH_CmEaD_GaDaGoAaCgDiGiBkDcCuEgCwEiDoGQYgBeD_@s@cAmBi@aAIQaHmMgMyUEIuB}Dq@qAq@oAq@qAgCwEuAgCs@qAcIgO}BiE{FmK_@q@_@q@_@s@s@sA_@s@i@cACEeE{HaFiJSc@oF_KgAwBw@_Bu@}AM[mBmE]{@o@wAy@sBq@_B}@wBQa@m@wAg@mAUi@o@}Ac@gAw@mB_@{@q@cBUg@aAaCaA_Cy@qBSg@Wm@iAqCmAuCEKUi@uVgm@qKkWSi@_CuFc@gA?Aw@kBqHuQqIsS{DoJuXcq@Ug@yKaX}DqJSi@kLcYgDeIy@oBgAoC_CyFeBeEu@mBa@aAoA}DiA}D_C_JgEiPuH{YeF{RUy@aGaUOm@}HgZ_FiROk@}CoL}DiMQk@wKm]eA_DQk@uFqPkAkDe@uAaAyC{CqJyAyEM_@w@cCw@aCoBcG{AyEi@_BoDmLsAmE}@oCQk@}AyEeA_EOi@[cAqAcEyA{EkJkZQk@u@eCw@gC{H{UsJm[oG_Ts@}B}BoHsC{IyHoVyHoVqCaJwIaYEMgEkN}FiQQi@kCaIqBgGwG_S_EsLIYo@mB}AqEwCwIsA_EsAaEq@qBeBeFwDaLQk@[}@oF}OUs@cCoHm@gBqAiEQk@Sq@gGoSIWgJi[Qm@Qk@cFaQOk@]gAgA{DoFoQ_A}C}F_SqByGeCoIcCmIcH{UkI_YmDwLyH{WgG{S{CoKsEmOQo@Qk@u@cCsAqE_@qAaDuKSo@aCiI{EiPcD{KeByF?Au@qCcAaDuFmRy@oCa@kAAGo@eBYq@Wg@]q@_@q@]q@w@oASYY_@q@{@k@q@y@y@eAaASQMK[UWQc@[YQ]Qc@Wa@Q_Aa@AA_@O]MsA][I}A[}Ew@iBYa@G{GeAoNyBc@GaC_@aAQc@Ia@Ia@IYGiA]e@O[MqAk@GEs@]MIUO{@k@_@WWS_A{@c@c@]]c@e@[e@u@aAi@w@Ye@S]_@q@i@kAc@aAYu@[_AWy@Y{@sAmEIUcBwFoGiTQk@sDcMeCkImPuj@GQAEiHkVQk@qIiYoDyL_DmKCKaAeDQi@_BsF_DmKuBcHoAcEsDeMAAq@cCy@gCu@iCm@qBu@aCOm@s@cCe@yAi@gB]kASs@[cAQm@g@cBk@kBe@_BYeA_@kAu@eCSs@EMa@uAOe@Uw@K]eAqDmBsGoBwGqAmEaCcI_C_Ii@mBk@mB_A{CACuBiHeAiDuAwE}@uCQk@Us@mA}DcAeDu@gC[aA_C{HcAoDs@gCaBuFSu@Qk@W{@gA{Dy@{C}AoFq@}BK_@Ss@{CcK_BqFM_@]qAgAoDm@wBcAgDoAeEe@_Bo@sBmAgEs@aCc@_By@uCmAiEiAuDgAuDiAaEqAoEUu@m@sBkBqGkAyD{@yCM_@y@qCiAyD]iA]iAu@eC{ByH_DoKiCyIUs@sAuEe@aBo@{BqByG_BmFgBcGkBkGoD_MY_AQk@IYiC{I{@wC_A}C{CcKiCuI{AcF{AaFeAkDa@oAq@}BcByFsBwGmBwGoDwLaGcS{EiPIWyAaFeGoS_@oA_EeNs@cCWy@iBiGQk@gCwIg@aBQk@Mc@cCkIyAaFm@sBcB{FU{@sAuEsAkFMc@qGuWwA}F{@aDwEiRU{@Mk@oFkTaCmJqAmFOi@y@iDOm@Qm@m@gCaAcE_HeXkCiKmDgOa@}AOk@]{AiCgKw@}CaCgJOm@o@_CQu@_DgMOk@oCyKo@iCMe@?AQs@Om@Ok@Mm@Om@Om@a@cBw@_Dq@kCSy@o@gCOm@Ok@i@wBEQOm@_AuDOm@y@eDs@yCOm@wD{Om@oCMs@A?Ko@WwAw@aFa@sCg@oD}AwKCOoEo[SsAqBgNm@gEy@eGM}@s@iFoAeJu@gFe@eDs@}ESwAOqAS_BOaBOqAQmBMkBKcBIoBGsBEqB?mA?_A@O@uBDgC@c@DsAFaBBe@HoAFcAHcALqAP{ANqANgANkANeABKNy@Hg@VmALo@Pq@VeAj@qBh@eBPq@@A`CiIxBuHpAoEzEaPjHsVPk@r@cC|B{H^sAbEcNr@gCh@sBBEFYlGsTDKzCiL|@}Ct@oCz@kDDUt@_Dr@iDp@gDn@gDj@iDRsAb@sCl@iEh@mE^oDXsCZqD\\kE@MPiCLqBFqAHwANaEJuCJsEF}BFqCRiJ^mOPcINyFN}GTuJZ}MVuKb@sQPiIHsDBcB@aA?mAA}B?YCwBAy@MqHG{FEkCG_DAsACuAKeG?SOyIMmHKmGK{FAy@KiGAqAKyFKcGEcCKoHMkIKqHG{CCoAImFEaBGyAU_FAUG}@g@kFa@sDWqBKo@SsAG_@GYWuAOw@WsAe@qBYkASy@YeAw@kCeAkDu@gC_BgFyAaFyA{E{BqHqAiEg@aBe@_BsAmEeB{FoAgEs@cCoC_J}AgF}BuH}@yCK_@i@oB[qAa@oBWuAMy@Kq@U}AOwAOyAKwAG{@G}@GyAE{ACwACaB?EGmFEiECuDUuVU}SAw@EgFM_NCcEEyEUsRI_I]g^C_DGeEEyCCwCCqAKuKCeBEgAAi@I{AMiBAKUkC]eD_AeJkAsLq@{GMgAq@qGImAMmAu@yHGe@eAcK?A?Ea@eEe@uEo@wG_@yD]{COiAOcAk@wCi@{Bs@kCk@gB}AcFcCcIkBiGu@cCQk@aE}MqByGc@uAkBkGoC_JyEuOs@_CoCiJkBwF{FoRgAqDQk@{A_FqAeEkN_e@yAaFcE_N{AeFg@_B_BoF{AgFq@yB[cAiB}FcAgD_@sAgAoDq@yBc@{AQg@qGiTmAeE{@sCo@wB[}@oAcEm@mBc@kAOg@Yq@c@kAk@uAeAuBu@gB_F{LkAwCqA}CyAuDuAiDyGqPkCqGyBqFEMoB_FqHaR_C{FO_@cCgG{BwFYq@}B{F}ByFoB}Em@}AqA_DoB_FwAoDiAsCi@oASi@_A}Ba@gAw@wB}@{B{BwFiAoCACiAsCwAmD}@{BuAmD}CcIsAoDy@_CqAmDgH{RyJkXKYqAmD{AgEq@iBcAsCe@qAy@{B{AiE_BkEeAuCeAuCo@eBcAuC}@cCa@iAy@}BgAyCeAuC{@_Cy@{By@_C{@_CgFqNSi@iCiHWs@a@mAcAqCiBcFqD}Jk@_BsAuDiBaFaCwGgAwCoAmDiBeF}AkEyF{O_BqEaC{Gc@kAm@eBcFgNIW_AiCISoCqHiGyPgHwRm@aBo@eBo@cBc@kAWm@MYYq@g@gAYm@{@cBcAiB}@wAk@aA]g@_@i@[e@a@i@q@}@_@c@q@{@s@{@oB}Bu@}@sLoNcBoBaAkAOSq@w@aAmAs@{@o@{@o@{@e@q@IMg@w@c@u@e@u@w@wAaAkBu@}Aw@kBcAkCYw@s@qBc@wAu@cCIUaDmKQk@_Ly^a@uAg@}Aq@}Bc@sAs@cCW{@}@{Cq@_CSq@g@cBmBsG_BsF_@qAw@mC_CgIK_@{CiK_A_DsAwEiAwD_BwFo@wBiAyDu@cCs@eCk@mBs@cCe@}Ac@yAq@aCk@mBu@eC]oAm@wBm@qB_@kAW_A}@}C_@qAk@iBU{@GS{@uC_AcDs@cCgBgGsCwJqAoE}BaIsAuEqAoEkLw`@wAaFY_AyAeFqAsE}AoFqAqEAA{AoFiBiGoAmEAGsAuEgBiG{B{H{AmFgC}IoDeMK]{AkFs@eC_BcG}@gDwAkFKc@aG{TKa@kBcHsByHAGaBgGkC_K_DmLsB}HCGq@eCg@iBWw@Uo@Qc@Sc@Ym@Sa@Uc@Wa@U]U[Y_@]c@c@e@e@c@EC[YAASQYQ[Ue@Y{Ay@gB_AsAq@iAm@kCuAqAq@KESMeB}@aB}@oAq@e@[e@]c@]e@a@q@w@QUQU]e@MSIKa@u@]o@Q_@Ug@Qa@Si@gAsC}@_Cy@wBoFqNkCaH}DiKcCsGaBiEsAmDM[cCqGy@wBeBoEkBaF_BeEsCmH_CgGqBmFeCsG_BcEACiAwCc@kAWq@eCsGqCkHcCsGiAsCiCoGWk@[q@e@cA"
//                        },
//                        "start_location" : {
//                           "lat" : 44.7393229,
//                           "lng" : -75.50066799999999
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "67,6 км",
//                           "value" : 67579
//                        },
//                        "duration" : {
//                           "text" : "45 хв",
//                           "value" : 2728
//                        },
//                        "end_location" : {
//                           "lat" : 45.46434350000001,
//                           "lng" : -73.6073437
//                        },
//                        "html_instructions" : "Продовжуйте рух по \u003cb\u003eAutoroute du Souvenir\u003c/b\u003e/\u003cwbr/\u003e\u003cb\u003eAutoroute 20\u003c/b\u003e\u003cdiv style=\"font-size:0.9em\"\u003eВ’їзд до: Квебек\u003c/div\u003e",
//                        "polyline" : {
//                           "points" : "iw|rGvcxdMqC_GqAoCe@aA{AeDACsAqCmDoHwGmNcHcOcEsISe@a@{@_AqBaBkDwBsEsBkEUe@iB{DoAgCk@mAs@sAw@_BqAkCo@mAOY{@kBO_@O_@Wo@a@oAM_@I[IWK_@EQU{@WoAWwAa@{BUsA_@}BcGu^k@gDyAoIaGg]aBoJY}Ak@yCa@sB_@cBc@gB_@sA_@qAg@eBk@cBKYCMSg@e@mAy@qBo@}Aq@_Be@kA{@qB]y@IScAcCg@kAmAyCiBkEwLsY}@sBs@eBo@}Aq@_Bs@eBGOyAmDyDeJ]}@aBgEyCaIaFsMkCeHkCcHiDcJw@qBmBeFSi@ISwB{FoCcHeBwEuCyHcCoGaCqG}AaEe@mAiCcHmCiHeDoIcA_CmAsCUe@oJwRaC}E}B{E{AyCu@{AwBoEKWaAwBUe@uAaDcAgC}@aCk@}AeA}Cu@{Bs@}BYw@uH}UQk@uC}IUs@c^yhAc@sA}@qCqA_EcAcDyB}Gu@_Ci@aBc@kAw@oBSe@Uk@y@gBcBeDi@aAs@mACE[i@e@w@e@s@a@k@]e@a@i@}@iACCa@i@cC_De@m@MOkC_DoB_C[_@q@w@}@iAiCaDu@aAsAaB[_@cKgMmL{NkAwA_O_RQUiB{BiKmM[a@}BsC}UcZkVqZkB_CsDqEk@u@oAeBYa@Y[W]sCiDmBcCc@m@kBgCYc@oB}Ci@}@wAqBcA_BuAwByBgDwBgDkBuCs@eAu@mAiBsCiDmFw@oAw@qAe@{@EGi@eA}@gB{@kBeAeCGO_@cAsEuMcBcFcGmQY{@Sk@cCoHSi@mCeI_B{E}AuEqGiRgBqFgAaDw@kC]eAm@oBqAeEgB{FiAsDyEqOiEiNsHiVgJgZ{EyOAEyD_MuDwLQk@w@eCMc@{A}EuMwb@gAgDAEm@sBaAyCiB_GiGiS}DiMmBmGQk@a@oAgB}FwBcHeBwFyBeHMa@a@oA}Qam@iEgNu@eCw@cCQk@Ka@oDiL_BkFUs@GQoQ{k@_AwCoBoGsAmEoKk]mA}DsG}S}C}Ja@iA_BaFmA{DaAsCKYsDqLuAsEkDcL_CsHQk@Qk@k@mB_BgFi@cBOe@s@mBu@mB_AaC}@sBEKqAoC{AwCCEq@qAi@aACCWe@e@u@mCeEWc@A?gBmCw@iAs@eAYc@Ya@KOcAyAYa@s@eAmAiBu@eAa@k@QYgBkCg@q@MSs@eAYa@Yc@GIqAoBOSoAkBq@eA[g@[e@k@}@oAsBS]gAgBiCgEmAsB{AeCkDyFEIoBeDMQcBsCWc@EEMUc@s@w@qA{EaIe@y@}@wAkAmBcAeBaBmCS]_AwAs@cAa@m@{@aAMMg@g@q@o@aAy@_DgC}AoAkCwB][IIYYuAuAuByCU_@[i@S_@s@wAy@qBIS_@_AKWEMcBmEkBeFi@yAKYUm@g@wAMYm@{AcAkCw@oB_@aACEa@eAYo@eDqIu@qBSk@w@mBa@iAcAmCk@}A}AwDgAeCWo@a@}@i@mAi@kAWm@e@gA[y@o@yAeAiCcAiCgAqCa@}AQ}@QoAEi@ASG}AEmCUyOEqBGgEMiHE_BCaDSwKMqHAm@Am@EwC?OI{D?OKgCEmAIgBIqAMeBQkCc@_Fi@yFmAoMUqBKy@OyAIi@Ku@SuAGWWgB]qBg@mCc@sBYkAo@qCwAsF{BcJwHwZq@kCaAyDi@sBG[uAsF[mAW{@W_AWq@IUq@}Ag@gAk@eAMWw@qAEGg@u@Yc@[_@g@k@]e@}AsAu@o@}E_E}AoAgA{@y@m@aAu@CCAA}AkA{AoAIGqAiAwBqBmAeAOMk@g@_@YIKi@c@ECQOoFoEwD_DGECCMK[YCAKKe@]g@e@w@u@[_@c@g@MQCEQWCEm@}@EIe@{@g@eAMYCGg@kAa@gA[}@W}@Og@U_AS{@QaAUsASqA_AiHa@sCQiACSIk@OaAQsASsAUuAQaASaAS{@cAsDc@oA_@kAa@kAK[Us@_@mA_@qAe@eBw@yC_AuDI_@uAsFiAmEq@oCq@kCk@{Bi@yBa@eBU{@yAmGw@aDq@mCEQ{@iDuDyNm@{BGSoA_FiAiEYaACKYgAcAiDiAiEwAqFW_AqB_IYeAYeAYiAoAcFaCmJ{@oDmA_Fo@iCoBsH}AgGuAmF{@gDgAkEi@{Bs@gD_@iBe@}Ba@aCg@sC[mBm@aESyACU[cCUkB]yC[}CWyCSoBUeCSsBEg@O{AGg@[yC[mDAE_@kEEg@a@qEmAiNYeDKsAs@eIS{BEe@YaDI{@SiC?AOcBMgB]wE]cE[qDq@aIOgBUqC]wDIaAc@aFYmD_@gEKiA}@qKMuASuBOqBYyCc@eFMuAg@wFEg@MuAO{A_@_Dk@sFu@eFE[u@qEaAiF_AmF_BuIo@iDsEqWG_@Ie@ACIa@kAwGoDqSiBcKOy@uEyVqA_HiAoGa@{Bi@wCeAyFe@mC]gBm@}DIk@y@qFIg@c@yCqAsIIk@a@wCKo@S{AKu@Iq@WwBYaCgAaKsC}Va@gD_AgIaAuG_@sBKm@g@aCq@wCWcAWaAMa@q@}B_A{Ca@sAQk@o@sBwAqE_DaKiAoDs@_CYiAgAeEEO[}Am@{C[mBYgBg@kD_@}CU}B_@aFWcE[yFKaCGsAOgEEoAMqFCoAAaBAgDAmA@uGBcGD}E?]DgF@uA?O@{ADaGL}SH{O?s@BkEDsHDsH\\ao@D}HFqNBsB@iD?uBDiDH{C@QHiCNsBBe@Do@BWDg@t@wHd@_EdA}Jd@uE@EN}APwAFw@HaABs@Bq@By@@_@@{@?s@Am@?OAk@Am@AKEy@Es@Gk@AI?EGc@Im@Mq@YaBMs@QeAi@wCO{@QeAMq@WyAMw@QsAIw@AKEe@I}@Ce@AMEs@Ae@A]?Q?k@?_ABwB@}@@aABkCBcD?qAFiJ?}AB{FBiG@uC@{@@yADcID_G?}@?C@_ABmEBwEDqIBkF@_CBqC?oA@yAH_MDaJBwFNmUH{NB}FFeJ@]@{B@q@BeB?ADiG?q@DsGBqB?K@mB@kBF_FDyBJuEJaDLkEDcBFqCF{BBwBDaDBqE@yA@sCBsFBcFBsEBkC?aAD_G@{B@cCB_F@wABuD@qABm@@i@Be@Ba@Bc@BSH{@JeANeAN_AJm@P{@RcANk@Ts@r@cCd@aBz@mCp@yBl@oBJ_@j@sBXcAH_@DMLm@H_@BO\\}Aj@kCx@{DLm@\\{ALm@x@uDh@eC\\gBHe@V}AT}AT_BRkBDe@Dc@HqAHoC@q@JmEPqHBqABoA?U?Q?W?kAAy@Cs@Cm@Ca@AIUsBO_AOy@[uASs@Oc@EMIQOc@CGGOCESg@[cA{@mC?Ao@sC}@{BSi@Si@_A_CqAcDSi@IQKU{A}CEIg@eAUe@IQc@{@uBaEUg@KQy@cB[m@_AoBuAwBuAqCCGe@cA[w@Q_@IYM_@Qu@Mg@Mg@Oa@Oa@CE[q@gAaCi@eAi@cAw@}BAAMWWa@k@}@aBgCg@w@[m@e@w@Uc@]{@i@w@}AcCy@oAuAwB_AuAiCiEq@iAi@}@a@o@eAgBCEeBqCeBwC]i@}EmIeAuBaAsB{@eB_BuDa@_AGQe@qAi@yACIO_@w@aCSk@gBmGOk@Sq@}@sD_BsFgAqDa@yAgAqDgAcDgCgIs@wB"
//                        },
//                        "start_location" : {
//                           "lat" : 45.2083667,
//                           "lng" : -74.3482841
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "4,0 км",
//                           "value" : 4000
//                        },
//                        "duration" : {
//                           "text" : "3 хв",
//                           "value" : 196
//                        },
//                        "end_location" : {
//                           "lat" : 45.4909616,
//                           "lng" : -73.5747162
//                        },
//                        "html_instructions" : "Продовжуйте рух по \u003cb\u003eAutoroute 720 E\u003c/b\u003e",
//                        "polyline" : {
//                           "points" : "cwntGzlg`MiDeKCGyAqEy@cC_AaCoBaF_@y@c@y@We@?AAAq@gAm@_A[c@EGs@y@QSOSQQ_@c@c@[YScBoAMMo@s@iAu@aAm@o@WMI_Aa@UKa@Q[_@QU[[_@]_@SIEWMcAa@{@[UIeAYa@Ka@MiBe@cAYIC}Ae@c@Ma@MuBm@SIyAi@o@]k@]}@k@SOa@[u@o@CCk@i@u@y@QWY_@SUGKo@kAUc@AAi@aAgAqBQ_@U[aCqDEIa@q@OWWe@k@eA_AgBWe@_ByCWe@}AyCWg@o@kAgAsBWe@mCeFIQKO?Ao@kA_@k@i@}@Ye@Yc@_BwCIQyAqCO[IOGKQa@cBwCq@kAq@kAcA_Bk@cAqAkBmBsC_@g@a@g@sAiB{B}CeCiD"
//                        },
//                        "start_location" : {
//                           "lat" : 45.46434350000001,
//                           "lng" : -73.6073437
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "0,8 км",
//                           "value" : 844
//                        },
//                        "duration" : {
//                           "text" : "1 хв",
//                           "value" : 76
//                        },
//                        "end_location" : {
//                           "lat" : 45.49581389999999,
//                           "lng" : -73.56693980000001
//                        },
//                        "html_instructions" : "Поверніть на виїзд \u003cb\u003e4\u003c/b\u003e до \u003cb\u003eRue de la Montagne N\u003c/b\u003e/\u003cwbr/\u003e\u003cb\u003eRue Saint-Jacques\u003c/b\u003e",
//                        "maneuver" : "ramp-right",
//                        "polyline" : {
//                           "points" : "o}stG~`a`MG[A?SY_AwAgCqDaAuAa@s@[i@a@w@s@yAWo@Sq@Ka@[qAGUs@sBUu@YeAs@yCOm@AA]yAK]GKAAUUSOIEMIUE[@QAO?IAGAEACAGCGEEEKM"
//                        },
//                        "start_location" : {
//                           "lat" : 45.4909616,
//                           "lng" : -73.5747162
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "65 м",
//                           "value" : 65
//                        },
//                        "duration" : {
//                           "text" : "1 хв",
//                           "value" : 13
//                        },
//                        "end_location" : {
//                           "lat" : 45.4961802,
//                           "lng" : -73.5675859
//                        },
//                        "html_instructions" : "Поверніть \u003cb\u003eліворуч\u003c/b\u003e на \u003cb\u003eRue Jean d'Estrées\u003c/b\u003e",
//                        "maneuver" : "turn-left",
//                        "polyline" : {
//                           "points" : "y{ttGjp_`Mw@xAKXEL"
//                        },
//                        "start_location" : {
//                           "lat" : 45.49581389999999,
//                           "lng" : -73.56693980000001
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "0,3 км",
//                           "value" : 295
//                        },
//                        "duration" : {
//                           "text" : "1 хв",
//                           "value" : 71
//                        },
//                        "end_location" : {
//                           "lat" : 45.49822349999999,
//                           "lng" : -73.56518009999999
//                        },
//                        "html_instructions" : "Поверніть \u003cb\u003eправоруч\u003c/b\u003e на \u003cb\u003eRue Saint-Antoine O\u003c/b\u003e",
//                        "maneuver" : "turn-right",
//                        "polyline" : {
//                           "points" : "c~ttGlt_`M_AoAaAoAKKYQgB_CgAwA_AkA"
//                        },
//                        "start_location" : {
//                           "lat" : 45.4961802,
//                           "lng" : -73.5675859
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "0,5 км",
//                           "value" : 529
//                        },
//                        "duration" : {
//                           "text" : "2 хв",
//                           "value" : 148
//                        },
//                        "end_location" : {
//                           "lat" : 45.5009454,
//                           "lng" : -73.57075139999999
//                        },
//                        "html_instructions" : "Поверніть \u003cb\u003eліворуч\u003c/b\u003e на \u003cb\u003eRue Mansfield\u003c/b\u003e",
//                        "maneuver" : "turn-left",
//                        "polyline" : {
//                           "points" : "{jutGje_`MIPM^KVsAfDUj@GRGLSh@i@rASh@Sh@s@jBi@tAO^KZ]|@gApCSf@i@pA"
//                        },
//                        "start_location" : {
//                           "lat" : 45.49822349999999,
//                           "lng" : -73.56518009999999
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "0,2 км",
//                           "value" : 243
//                        },
//                        "duration" : {
//                           "text" : "1 хв",
//                           "value" : 85
//                        },
//                        "end_location" : {
//                           "lat" : 45.5027516,
//                           "lng" : -73.5689958
//                        },
//                        "html_instructions" : "Поверніть \u003cb\u003eправоруч\u003c/b\u003e на \u003cb\u003eRue Cathcart\u003c/b\u003e",
//                        "maneuver" : "turn-right",
//                        "polyline" : {
//                           "points" : "}{utGdh``MsAyAQKQQ}@{@gAcAEGk@g@GGYYUS"
//                        },
//                        "start_location" : {
//                           "lat" : 45.5009454,
//                           "lng" : -73.57075139999999
//                        },
//                        "travel_mode" : "DRIVING"
//                     },
//                     {
//                        "distance" : {
//                           "text" : "0,2 км",
//                           "value" : 181
//                        },
//                        "duration" : {
//                           "text" : "1 хв",
//                           "value" : 63
//                        },
//                        "end_location" : {
//                           "lat" : 45.5017123,
//                           "lng" : -73.5672184
//                        },
//                        "html_instructions" : "Поверніть \u003cb\u003eправоруч\u003c/b\u003e на \u003cb\u003eBoulevard Robert-Bourassa\u003c/b\u003e",
//                        "maneuver" : "turn-right",
//                        "polyline" : {
//                           "points" : "egvtGf}_`MLQ`@w@b@iAh@oAN[Zs@PWRW"
//                        },
//                        "start_location" : {
//                           "lat" : 45.5027516,
//                           "lng" : -73.5689958
//                        },
//                        "travel_mode" : "DRIVING"
//                     }
//                  ],
//                  "traffic_speed_entry" : [],
//                  "via_waypoint" : []
//               }
//            ],
//            "overview_polyline" : {
//               "points" : "e`miGhmocNeIzBsEcEuAeLeD{h@wK{j@}PiiAeo@dPy`@rWeo@zBax@kUg`@oi@Vgr@_d@odAie@eQqZiZcr@v\\}uBjMsfB~Smv@jFwEsNmOyvDafAcfIkb@glCqd@yoAci@c|GxKi{@nKiqAiiCy`FglAyqCgy@k}Bco@u}Bih@i{DcoA_nJvBkcGuzAqqJyd@eqDhQcnBxi@weAtJiw@iGojAih@adIuU{jCgz@mcCwUiyBsPysFuk@qeFihBoxN{pBg~Ni}B}vPkX}vF}Vu{C{z@coFrCa_AlSueB_TmyB_j@_uBiV}_AmByaAgPai@sm@ewB}B{iCvOmqB~VafAsf@maGwt@uzGwk@y}IcUstB}r@kmEwoAg}E_V{l@u^eb@gQ}x@aZ}hBkFukAskAuaBqUahCufAueFidAouB_bA_xEqi@ycBeByoAeDulBm`@q`AypA}oDmqCyxHejAo_HebBwsKil@wkDeq@s|BceBe~KmDamBjV}_CyxA{gS_qBi`Y}Uo}Co`@{`Bok@k~Bz@q|@cActAue@o_DwZkvLsh@uoZcPgmJoEyvG{NcuAza@ozA`g@syBjq@ouFY}tB_u@a}Bst@a~Ei[_}@mc@ew@ga@_c@qfAwwCsg@crEuOsnDuR{zF{ZagHmYolBsi@uuEoQi_CdDey@jG}oBo`@cgCm|AgwFmhAuuDuS}eBpCq}CqYi|Bs[ykByr@cmAq`A_hCowAmkBaf@whAmt@_s@weB{b@y`BylAymDycDqfCqtCeYi`CnH{aBof@kaBcWq_@w`@wA_`Al@{_@wOmaBsmCqsAks@is@_kAkfAo{Bov@sjAw|CsrFefDmnE{zF{jHadAoqAcVan@ai@chC_pEkuHk~@_lA_lAyo@geF{hJmtDiaHuzEamKwkAygDagAwwDavBc}GwtFovQyWaq@kQkKmhAa^uuCsrJcyBirHy|DypNah@ysBsm@o}DjIujAvjAurE~KasEcJoqDqw@qqCoI_yEk[i`DelBokGetD{wJsyCiaIme@qk@cd@moAey@uqCyrC}zJcm@cb@kmAc_Da~AckDql@evCkrDwaJ{vAsxD}|CeyDamA_dCycCo}HuzBgjHyw@snBorBuvC_m@c|AsMqy@{B}gAsk@sxCar@_q@oa@{m@ka@uhBk}@emDmZsiCapAkjJ}k@_{CyGqwDbKemDsHeo@lGqwIz_@ynDuv@ktBoy@}yAer@qnBgi@wXye@qh@osA{eCmFv@}KsMqDhJiFbNcKRdBiM"
//            },
//            "summary" : "ON-401 E",
//            "warnings" : [],
//            "waypoint_order" : []
//         }
//      ],
//      "status" : "OK"
//   }