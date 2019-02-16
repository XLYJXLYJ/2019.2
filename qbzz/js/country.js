var countryList={"hot":{"27":"\u4e0d\u4e39 Bhutan","188":"\u4e5f\u95e8 Yemen","204":"\u4e2d\u534e\u4eba\u6c11\u5171\u548c\u56fd(\u4e0d\u542b\u6e2f\u6fb3\u53f0\u5730\u533a) China"},"H":{"1":"\u4e2d\u56fd\u9999\u6e2f\u7279\u522b\u884c\u653f\u533a Hong Kong","86":"\u5308\u7259\u5229 Hungary","227":"\u6d77\u5730 Haiti","228":"\u6d2a\u90fd\u62c9\u65af Honduras"},"M":{"2":"\u4e2d\u56fd\u6fb3\u95e8\u7279\u522b\u884c\u653f\u533a Macao","21":"\u8499\u53e4 Mongolia","40":"\u9a6c\u6765\u897f\u4e9a Malaysia","41":"\u9a6c\u5c14\u4ee3\u592b Maidives","42":"\u9a6c\u7ecd\u5c14\u7fa4\u5c9b Marshall IsIands","96":"\u9a6c\u5176\u987f Macedonia","97":"\u9a6c\u8033\u4ed6 Malta","99":"\u6469\u7eb3\u54e5 Monaco","100":"\u9ed1\u5c71\u5171\u548c\u56fd Montenegro","154":"\u9a6c\u8fbe\u52a0\u65af\u52a0 Madagascar","155":"\u9a6c\u62c9\u7ef4 Malawi","156":"\u9a6c\u91cc Mali","157":"\u6bdb\u91cc\u5854\u5c3c\u4e9a Mauritania","158":"\u6bdb\u91cc\u6c42\u65af Mauritlus","159":"\u9a6c\u7ea6\u7279 Mayotte","160":"\u6469\u6d1b\u54e5 Morocco","161":"\u83ab\u6851\u6bd4\u514b Mozambique","231":"\u58a8\u897f\u54e5 Mexico"},"T":{"3":"\u4e2d\u56fd\u53f0\u6e7e Taiwan","8":"\u6cf0\u56fd Thailand","13":"\u5854\u5409\u514b\u65af\u5766 Tajikistan","14":"\u571f\u5e93\u66fc\u65af\u5766 Turkmenistan","56":"\u6c64\u52a0 Tonga","58":"\u56fe\u74e6\u5362 Tuvalu","114":"\u571f\u8033\u5176 Turkey","183":"\u5766\u6851\u5c3c\u4e9a Tanzania","184":"\u591a\u54e5 Togo","185":"\u7a81\u5c3c\u65af Tunisia"},"S":{"4":"\u65b0\u52a0\u5761 Singapore","5":"\u97e9\u56fd\uff08\u5357\u97e9\uff09 South Korea (R.O.K)","20":"\u65af\u91cc\u5170\u5361 Sri Lanka","55":"\u6240\u7f57\u95e8\u7fa4\u5c9b Solomon IsIands","57":"\u8428\u6469\u4e9a Samoa","106":"\u5723\u9a6c\u529b\u8bfa San Marino","107":"\u585e\u5c14\u7ef4\u4e9a Serbia","108":"\u65af\u6d1b\u4f10\u514b Slovakia","109":"\u65af\u6d1b\u6587\u5c3c\u4e9a Slovenia","110":"\u897f\u73ed\u7259 Spain","111":"\u745e\u5178 Sweden","112":"\u745e\u58eb Switzerland","171":"\u5723\u591a\u7f8e\u548c\u666e\u6797\u897f\u6bd4 Sao Tome and Principe","172":"\u6c99\u7279\u963f\u62c9\u4f2f Saudi Arabia","173":"\u585e\u5185\u52a0\u5c14 Senegal","174":"\u585e\u820c\u5c14 Seychelles","177":"\u5357\u975e South Afica","179":"\u82cf\u4e39 Sudan","181":"\u65af\u5a01\u58eb\u5170 Swaziland"},"J":{"6":"\u65e5\u672c Japan","91":"\u6cfd\u897f\u5c9b Jersey","147":"\u7ea6\u65e6 Jordan"},"U-Z":{"7":"\u8d8a\u5357 Vietnam","15":"\u4e4c\u5179\u522b\u514b\u65af\u5766 Uzbekistan","59":"\u74e6\u52aa\u963f\u56fe Vanuatu","115":"\u4e4c\u514b\u5170 Ukraine","116":"\u82f1\u56fd United Kingdom","186":"\u4e4c\u5e72\u8fbe Uganda","187":"\u963f\u62c9\u4f2f\u8054\u5408\u914b\u957f\u56fd United Arab Emirates","189":"\u8d5e\u6bd4\u4e9a Zambia","190":"\u6d25\u5df4\u5e03\u97e6 Zimbabwe","194":"\u7f8e\u56fd United States"},"V":{"7":"\u8d8a\u5357 Vietnam","59":"\u74e6\u52aa\u963f\u56fe Vanuatu"},"P":{"9":"\u83f2\u5f8b\u5bbe Philippines","17":"\u5df4\u57fa\u65af\u5766 Pakistan","51":"\u5df4\u5e03\u4e9a\u65b0\u51e0\u5185\u4e9a Papua New Guinea","52":"\u76ae\u7279\u51ef\u6069\u5c9b Pitcairn","102":"\u6ce2\u5170 Poland","103":"\u8461\u8404\u7259 Portugal","166":"\u5df4\u52d2\u65af\u5766 Palestine"},"B":{"10":"\u7f05\u7538 Burma","26":"\u5b5f\u52a0\u62c9\u56fd Bangladesh","28":"\u82f1\u5c5e\u5370\u5ea6\u6d0b\u9886\u5730 British Indian Ocean Territory","29":"\u6587\u83b1 Brunei","65":"\u767d\u4fc4\u7f57\u65af Belarus","66":"\u6bd4\u5229\u65f6 Belgium","67":"\u6ce2\u65af\u5c3c\u4e9a\u548c\u9ed1\u585e\u54e5\u7ef4\u90a3 Bosnia and Herzegovina","70":"\u4fdd\u52a0\u5229\u4e9a Bulgaria","121":"\u5df4\u6797 Bahrain","122":"\u8d1d\u5b81 Benin","123":"\u535a\u8328\u74e6\u7eb3 Botswana","124":"\u5e03\u57fa\u7eb3\u6cd5\u7d22 Burkina Faso","125":"\u5e03\u9686\u8fea Burundi","199":"\u5df4\u54c8\u9a6c Bahamas","200":"\u5df4\u5df4\u591a\u65af Barbados","201":"\u4f2f\u5229\u5179 Belize","202":"\u767e\u6155\u5927 Bermuda IsIands","203":"\u73bb\u5229\u7ef4\u4e9a Bolivia","212":"\u5df4\u897f Brazil"},"K":{"12":"\u54c8\u8428\u514b\u65af\u5766 Kazakhstan","38":"\u57fa\u91cc\u5df4\u65af Kiribati","39":"\u5409\u5c14\u5409\u65af\u65af\u5766 Kyrgyzstan","148":"\u80af\u5c3c\u4e9a Kenya","149":"\u79d1\u5a01\u7279 Kuwait","229":"\u79d1\u7d22\u6c83 Kosovo"},"U":{"15":"\u4e4c\u5179\u522b\u514b\u65af\u5766 Uzbekistan","115":"\u4e4c\u514b\u5170 Ukraine","116":"\u82f1\u56fd United Kingdom","186":"\u4e4c\u5e72\u8fbe Uganda","187":"\u963f\u62c9\u4f2f\u8054\u5408\u914b\u957f\u56fd United Arab Emirates","194":"\u7f8e\u56fd United States"},"I":{"16":"\u5370\u5ea6 India","18":"\u5370\u5ea6\u5c3c\u897f\u4e9a Indonesia","87":"\u51b0\u5c9b IceIand","88":"\u7231\u5c14\u5170 Ireland","89":"\u9a6c\u6069\u5c9b Isle of Man","90":"\u610f\u5927\u5229 Italy","143":"\u4f0a\u6717 Iran","144":"\u4f0a\u62c9\u514b Iraq","145":"\u4ee5\u8272\u5217 Israel"},"C":{"19":"\u67ec\u57d4\u5be8 Cambodia","30":"\u5723\u8bde\u5c9b Christmas IsIand","31":"\u79d1\u79d1\u65af\u7fa4\u5c9b Cocos IsIands (Australia)","32":"\u5e93\u514b\u7fa4\u5c9b Cook IsIands","72":"\u514b\u7f57\u5730\u4e9a Croatia","73":"\u585e\u6d66\u8def\u65af Cyprus","74":"\u6377\u514b\u5171\u548c\u56fd Czech Republic","126":"\u5580\u9ea6\u9686 Cameroon","127":"\u4f5b\u5f97\u89d2 Cape Verde","128":"\u4e2d\u975e\u5171\u548c\u56fd Central African Republic","129":"\u4e4d\u5f97 Chad","130":"\u79d1\u6469\u7f57 Comoros","131":"\u521a\u679c Congo","191":"\u52a0\u62ff\u5927 Canada","213":"\u667a\u5229 Chile","214":"\u54e5\u4f26\u6bd4\u4e9a Colombia","215":"\u54e5\u65af\u8fbe\u9ece\u52a0 Costa Rica","216":"\u53e4\u5df4 Cuba"},"a":{"22":"\u963f\u5bcc\u6c57 ","170":"\u963f\u62c9\u4f2f\u6492\u54c8\u62c9\u6c11\u4e3b\u5171\u548c\u56fd ","182":"\u963f\u62c9\u4f2f\u53d9\u5229\u4e9a\u5171\u548c\u56fd "},"A":{"23":"\u6fb3\u5927\u5229\u4e9a Australia","25":"\u963f\u585e\u62dc\u7586 Azerbaijan","54":"\u4e9a\u7f8e\u5c3c\u4e9a Armenia","62":"\u963f\u5c14\u5df4\u5c3c\u4e9a Albania","63":"\u5b89\u9053\u5c14 Andorra","64":"\u5965\u5730\u5229 Austria","118":"\u963f\u5c14\u53ca\u5229\u4e9a Algeria","119":"\u5b89\u54e5\u62c9 Angola","120":"\u963f\u68ee\u677e\u5c9b Ascension IsIand(U.K.)","195":"\u5b89\u572d\u62c9 Anguilla","196":"\u5b89\u63d0\u74dc\u548c\u5df4\u5e03\u8fbe Antigua and Barbuda","197":"\u963f\u6839\u5ef7 Argentina","198":"\u963f\u9c81\u5df4\u5c9b Aruba IsIand"},"x":{"24":"\u65b0\u897f\u5170 ","46":"\u65b0\u5580\u91cc\u591a\u5c3c\u4e9a ","146":"\u8c61\u7259\u6d77\u5cb8 ","178":"\u897f\u73ed\u7259\u5317\u975e "},"c":{"33":"\u671d\u9c9c\u4eba\u6c11\u6c11\u4e3b\u5171\u548c\u56fd\uff08\u671d\u9c9c\uff09 "},"F":{"34":"\u6590\u6d4e Fiji","35":"\u6cd5\u5c5e\u6ce2\u5229\u5c3c\u897f\u4e9a French Polynesia","43":"\u5bc6\u514b\u7f57\u5c3c\u897f\u4e9a Federated States of Micronesia","77":"\u6cd5\u7f57\u7fa4\u5c9b Faroe IsIands","78":"\u82ac\u5170 Finland","79":"\u6cd5\u56fd France","222":"\u798f\u514b\u5170\u5c9b Falkland Islands","223":"\u6cd5\u5c5e\u572d\u4e9a\u90a3 French Guyana"},"G":{"36":"\u683c\u9c81\u5409\u4e9a Georgia","37":"\u5173\u5c9b Guam","82":"\u5fb7\u56fd Germany","83":"\u76f4\u5e03\u7f57\u9640 Gibraltar(U.K)","84":"\u5e0c\u814a Greece","138":"\u52a0\u84ec Gabon","139":"\u5188\u6bd4\u4e9a Gambia","140":"\u52a0\u7eb3 Ghana","141":"\u51e0\u5185\u4e9a\u5171\u548c\u56fd Guinea","142":"\u51e0\u5185\u4e9a\u6bd4\u7ecd\u7684\u5171\u548c\u56fd Guinea-Bissau","192":"\u683c\u9675\u5170 Greenland (Danmark)","224":"\u74dc\u5fb7\u7f57\u666e Guadeloupe","225":"\u5371\u5730\u9a6c\u62c9 Guatemala","226":"\u572d\u4e9a\u90a3 Guyana"},"N":{"44":"\u7459\u9c81 Nauru","45":"\u5c3c\u6cca\u5c14 Nepal","47":"\u7ebd\u57c3\u5c9b Niue","48":"\u8bfa\u798f\u514b\u5c9b Norfolk IsIand","49":"\u5317\u9a6c\u91cc\u4e9a\u7eb3\u7fa4\u5c9b Northern Mariana IsIands","101":"\u632a\u5a01 Norway","113":"\u8377\u5170 Netherlands","162":"\u7eb3\u7c73\u6bd4\u4e9a Namibia","163":"\u5c3c\u65e5\u5c14 Niger","164":"\u5c3c\u65e5\u5229\u4e9a Nigeria"},"p":{"50":"\u5e15\u52b3 "},"E":{"53":"\u4e1c\u5e1d\u6c76 East Timor","76":"\u7231\u6c99\u5c3c\u4e9a Estonia","134":"\u57c3\u53ca Egypt","135":"\u8d64\u9053\u51e0\u5185\u4e9a Equatorial Guinea","136":"\u5384\u7acb\u7279\u91cc\u4e9a Eritrea","137":"\u57c3\u585e\u4fc4\u6bd4\u4e9a Ethiopia","219":"\u4e1c\u8428\u6469\u4e9a Eastern Samoa (U.S.)","220":"\u5384\u74dc\u591a\u5c14 Ecuador","221":"\u8428\u5c14\u74e6\u591a El Salvador"},"w":{"60":"\u5a01\u514b\u5c9b ","61":"\u74e6\u5229\u65af\u7fa4\u5c9b\u548c\u5bcc\u56fe\u7eb3\u7fa4\u5c9b "},"b":{"68":"\u4e0d\u5217\u98a0\u8bf8\u5c9b "},"y":{"69":"\u82f1\u56fd\u6d77\u5916\u9886\u571f "},"h":{"71":"\u6d77\u5ce1\u7fa4\u5c9b "},"D":{"75":"\u4e39\u9ea6 Denmark","133":"\u5409\u5e03\u63d0 Djibouti","217":"\u591a\u7c73\u5c3c\u52a0\u5171\u548c\u56fd Dominican Republic","218":"\u591a\u7c73\u5c3c\u514b Dominica"},"f":{"80":"\u6cd5\u56fd\u6d77\u5916\u5c5e\u5730 ","81":"\u6cd5\u5c5e\u897f\u5370\u5ea6\u7fa4\u5c9b ","117":"\u68b5\u8482\u5188\u57ce "},"m":{"85":"\u6839\u897f\u5c9b ","98":"\u6469\u5c14\u591a\u74e6 "},"L":{"92":"\u62c9\u8131\u7ef4\u4e9a Latvia","93":"\u5217\u652f\u6566\u58eb\u767b Liechtenstein","94":"\u7acb\u9676\u5b9b Lithuania","95":"\u5362\u68ee\u5821 Luxembourg","150":"\u9ece\u5df4\u5ae9 Lebanon","151":"\u83b1\u7d22\u6258 Lesotho","153":"\u963f\u62c9\u4f2f\u5229\u6bd4\u4e9a\u6c11\u4f17\u56fd Libya","230":"\u8001\u631d Laos"},"R":{"104":"\u7f57\u9a6c\u5c3c\u4e9a Romania","105":"\u4fc4\u7f57\u65af Russia","168":"\u7559\u5c3c\u6c6a Reunion (France)"},"g":{"132":"\u521a\u679c\u6c11\u4e3b\u5171\u548c\u56fd "},"l":{"152":"\u5229\u6bd4\u91cc\u4e9a ","169":"\u5362\u65fa\u8fbe "},"O":{"165":"\u963f\u66fc Oman"},"Q":{"167":"\u5361\u5854\u5c14 Qatar"},"s":{"175":"\u585e\u62c9\u5229\u6602 ","176":"\u7d22\u9a6c\u91cc ","193":"\u5723\u76ae\u57c3\u5c14\u548c\u5bc6\u514b\u9686 "},"n":{"180":"\u5357\u82cf\u4e39 "},"Z":{"189":"\u8d5e\u6bd4\u4e9a Zambia","190":"\u6d25\u5df4\u5e03\u97e6 Zimbabwe"},"q":{"205":"\u5168\u7403\u8303\u56f4 ","206":"\u5168\u7403\u8303\u56f4(\u9664\u7f8e\u56fd\uff0c\u52a0\u62ff\u5927) "}}