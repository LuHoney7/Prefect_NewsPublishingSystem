/**
 * tinymce plugin
 * Created by jerry on 16/8/5.
 */
tinymce.PluginManager.add('uploadimage', function (editor) {
	

    function selectLocalImages() {
    	
        var dom = editor.dom;
        var input_f = $('<input type="file" name="thumbnail" accept="image/jpg,image/jpeg,image/png,image/gif" multiple="multiple">');
        input_f.on('change', function () {
            var form = $("<form/>",
                {
                    action: editor.settings.upload_image_url, //设置上传图片的路由，配置在初始化时
                    style: 'display:none',
                    method: 'post',
                    enctype: 'multipart/form-data'
                }
            );
            form.append(input_f);
            //ajax提交表单
            form.ajaxSubmit({
                beforeSubmit: function () {
                	//alert('1111');
                    return true;
                },
                success: function (data) {
//                	alert('2222');
//                	alert(data);
                    if (data!=null) {
                    	//alert('4444');
                        editor.focus();
                        //tinyMCE 4.X版本的插入对象
                        tinyMCE.activeEditor.insertContent('<img src="http://localhost:8080/News-Publishing-System/newsFreeImgUp/'+data+'"/>');
//                        editor.selection.setContent(dom.createHTML('img', {src: src}));
//                        data.file_path.forEach(function (src) {
//                            editor.selection.setContent(dom.createHTML('img', {src: src}));
//                        })
                    }
                    else
                    	{ alert('3333');}
                }
            });
        });

        input_f.click();
    }
    editor.addCommand("mceUploadImageEditor", selectLocalImages);
    editor.addButton('uploadimage', {
        icon: 'image',
        tooltip: '上传图片',
        onclick: selectLocalImages
    });

    editor.addMenuItem('uploadimage', {
        icon: 'image',
        text: '上传图片',
        context: 'tools',
        onclick: selectLocalImages
    });
});