/**
 * Copyright 2016 by Qibaozz(Ben)
 *
 * Data:2016-11-18
 */

;(function( global ){


    function QibaoJS() {

        var uptoken_url = 'http://qbzz.qibaozz.com/uptoken';

        var domain = 'http://img01.qibaozz.com';

        function uploadParams(type, pickfiles_id) {
            return {
                runtimes: 'html5,flash,html4',
                browse_button: pickfiles_id,
                container: 'container',
                drop_element: 'container',
                max_file_size: '1000mb',
                flash_swf_url: 'plupload-2.1.2/js/Moxie.swf',
                dragdrop: false,
                chunk_size: '4mb',
                // unique_names:true,
                save_key:true,
                multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),
                // uptoken:'',
                uptoken_url: uptoken_url + '?type=' + type,
//		        uptoken_func: function(){
//		        },
                domain: domain,
                get_new_uptoken: false,
                // max_retries: 3,
                auto_start: true,
                log_level: 5,
                init: {
                    'FilesAdded': function(up, files) {
                    },
                    'BeforeUpload': function(up, file) {},
                    'UploadProgress': function(up, file) {},
                    'UploadComplete': function() {

                    },
                    'FileUploaded': function(up, file, info) {
                        uploaded(up, file, info);
                        // {
                        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                        //    "key": "gogopher.jpg"
                        //  }
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info);
                        // var sourceLink = domain +"/"+ res.key; ��ȡ�ϴ��ɹ�����ļ���Url
                    },
                    'Error': function(up, err, errTip) {
                        qibaoError(up, err, errTip);
                    },
                    //    'Key': function(up, file) {
                    //     var key = "";
                    //     return key
                    // }
                }

            };
        }


        var upload_array=new Array()
        var pic_mime = {
            'image/png': 1,
            'image/jpeg': 1,
            'image/gif': 1,
            'image/bmp': 1,
        };


        function beforeUpload(up, file) {
            if (((up.upload_type == 'user') || (up.upload_type == 'company')) && (pic_mime[file.type] != 1)) {
                alert('��ѡ��ͼƬ�ļ������ϴ���');
                $("#" + up.progress_bar_id).hide();
                up.stop();
            } else {
                up.start();
                if ((up.progress_bar_id != undefined) || (up.progress_bar_id != '')) {
                    $("#" + up.progress_bar_id).show();
                }
            }

        }

        /**
         * �����ϴ���Ҫ�ɵ���
         */
        function uploading(up, file) {
            if ((up.progress_bar_id != undefined) || (up.progress_bar_id != '')) {

                var html = ' <div class="fixHeight" style="height: '+file.percent+'%;"></div><p class="percent_uped">'+file.percent+'%</p>'

                $("#" + up.progress_bar_id).html(html);

            }
        }

        /**
         * �����Ҫ�ɵ���
         * @param {Object} up
         * @param {Object} err
         * @param {Object} errTip
         */
        function qibaoError(up, err, errTip){
//			if ((up.progress_bar_id != undefined) || (up.progress_bar_id != '')) {
//				$("#" + up.progress_bar_id).hide(1);
//			}
            up.stop();
            switch(err.code) {
                case -200:
                    $("#" + up.progress_bar_id).html('���ļ��Ѿ��ϴ���');
                    break;
            }
        }
        /**
         * �ϴ����Ҫ������
         */
        function uploaded(up, file, info) {
            if ((up.progress_bar_id != undefined) || (up.progress_bar_id != '')) {
                $("#" + up.progress_bar_id).hide(1);
            }

            var res = JSON.parse(info);
            var uploadfile_url = up.getOption('domain') +"/"+ res.key

            $("#" + up.uploaded_id).val(res.key);
            if ((up.upload_type == 'user') || (up.upload_type == 'company')) {
                $("#" + up.show_id).attr("src",uploadfile_url);
            } else {
                $("#" + up.show_id).html(file.name);
                $("#" + up.show_hide_val_id).val(file.name);
            }
        }


        function buildProcessArea(progress_bar_id) {
            var process_area = '<div style="position:relative;" class="upload_show_area">' +
                '<div class="upload_progress_bar_bk" style="width:100%; height:20px; background-color:#f5f5f5; display:inline-block; border-radius:4px;">' +
                '<div class="upload_progress_bar" style="float:none; display:block; width: 0%; height:20px; border-radius:4px; background-color:#5bc0de;background-image:linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent)">' +
                '</div>' +
                '</div>' +
                '<div class="upload_pro_text" style="position:absolute; top:0px; left:20px; line-height:20px; font-size:12px;"></div>' +
                '</div>';
            $('#' + progress_bar_id).append(process_area);
            $("#" + progress_bar_id).hide();
        }

        /**
         * @param string pickfiles  		ѡ��ťID
         * @param string uploaded_id		�ϴ����KEY�洢ID
         * @param string progress_bar_id 	����������ID
         * @param string show_id			�ϴ����ͼƬչʾID
         * @return plupload
         */
        function directQiniuUpload(upload_type, pickfiles_id, uploaded_id, progress_bar_id, show_id, show_hide_val_id) {
            if ((pickfiles_id == undefined) || (pickfiles_id == '')) {
                alert('error:û�д��ϴ���ťID');
                return false;
            }

            if ((uploaded_id == undefined) || (uploaded_id == '')) {
                alert('error:û�д��洢KEY��INPUT ID');
                return false;
            }


            /**
             * ��ʾ�ϴ�������
             */
            if ((progress_bar_id != undefined) || (progress_bar_id != '')) {
                buildProcessArea(progress_bar_id);
            }
            var QiniuUpload = new QiniuJsSDK();
            upload_array[pickfiles_id] = QiniuUpload.uploader(uploadParams(upload_type, pickfiles_id));
            upload_array[pickfiles_id].pickfiles_id 		= pickfiles_id;
            upload_array[pickfiles_id].uploaded_id 			= uploaded_id;
            upload_array[pickfiles_id].progress_bar_id 		= progress_bar_id;
            upload_array[pickfiles_id].show_id 				= show_id;
            upload_array[pickfiles_id].show_hide_val_id		= show_hide_val_id;
            upload_array[pickfiles_id].upload_type			= upload_type;

            upload_array[pickfiles_id].bind('BeforeUpload', 	beforeUpload);
            upload_array[pickfiles_id].bind('UploadProgress', 	uploading);
//			upload_array[pickfiles_id].bind('FileUploaded', 	uploaded);

            return upload_array[pickfiles_id];
        }

        /**
         * �û���ص��ϴ�
         * @param string pickfiles  		ѡ��ťID
         * @param string uploaded_id		�ϴ����KEY�洢ID
         * @param string progress_bar_id 	����������ID
         * @param string show_id			�ϴ����ͼƬչʾID
         * @return plupload
         *
         */
        this.userUpload = function(pickfiles_id, uploaded_id, progress_bar_id, show_id) {
            return directQiniuUpload('user', pickfiles_id, uploaded_id, progress_bar_id, show_id, '');
        }

        /**
         * ��˾��ص��ϴ�
         * @param string pickfiles  		ѡ��ťID
         * @param string uploaded_id		�ϴ����KEY�洢ID
         * @param string progress_bar_id 	����������ID
         * @param string show_id			�ϴ����ͼƬչʾID
         * @returns {plupload}
         */
        this.companyUpload = function (pickfiles_id, uploaded_id, progress_bar_id, show_id) {
            return directQiniuUpload('company', pickfiles_id, uploaded_id, progress_bar_id, show_id, '');
        }
        /**
         * ���ձ���ص��ϴ�
         * @param string pickfiles  		ѡ��ťID
         * @param string uploaded_id		�ϴ����KEY�洢ID
         * @param string progress_bar_id 	����������ID
         * @param string show_id			�ϴ����ͼƬչʾID
         * @param string show_hide_val_id   ԭ�ļ����ƽ���ID
         * @return plupload
         */
        this.tenderUpload = function (pickfiles_id, uploaded_id, progress_bar_id, show_id, show_hide_val_id) {
            return directQiniuUpload('tender', pickfiles_id, uploaded_id, progress_bar_id, show_id, show_hide_val_id);
        }


        /**
         * ���ۡ���������ϴ�
         * @param string pickfiles  		ѡ��ťID
         * @param string uploaded_id		�ϴ����KEY�洢ID
         * @param string progress_bar_id 	����������ID
         * @param string show_id			�ϴ����ͼƬչʾID
         * @param string show_hide_val_id   ԭ�ļ����ƽ���ID
         * @returns {plupload}
         */
        this.policyUpload = function (pickfiles_id, uploaded_id, progress_bar_id, show_id, show_hide_val_id) {
            return directQiniuUpload('policy', pickfiles_id, uploaded_id, progress_bar_id, show_id, show_hide_val_id);
        }

    }

    var Qibao = new QibaoJS();

    global.Qibao = Qibao;
})( window );