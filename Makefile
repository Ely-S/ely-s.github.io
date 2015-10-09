public/css/style.css: public/css/*.less
	lessc -x public/css/style.less > public/css/style.css

serve:
	make
	jekyll server

pub: public/css/style.css
	make
	git commit -a
	git push

.PHONY: pub serve