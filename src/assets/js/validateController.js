var ValidateController;

ValidateController = (function () { 
	function ValidateController () {
		this.successMessage = $('.bs-callout-info');
		this.form = $("#demo-form");
		this.select = $('#select');
		this.email = $('input[name=email]');
		this.fullnameComponents = [];

		var fullnames = $('.fullname');

		fullnames.each((function(_this){
			return function(index, data){
				var $data = $(data);
				_this.fullnameComponents.push({ 
					id: $data.attr('name').replace('fullname', ''),
					el: $data
				});			
			};
		})(this));

		this.startup();
	};

	ValidateController.prototype.reset = function(){
		for (var i = 0; i < this.fullnameComponents.length; i++){
			var element = this.fullnameComponents[i];

			element.el.attr('data-parsley-required', 'false').parent().hide();
		}

		this.successMessage.toggleClass('hidden', true);
	};

	ValidateController.prototype.setComponents = function(){
		this.reset();

		this.form
			.attr('data-parsley-validate', '');

		this.email
			.attr('data-parsley-required', 'true')
			.attr('data-parsley-trigger', 'change');

		this.select.change((function(_this){
			return function(evt){
				_this.reset();

				var input = _this.findFullnameById((evt.target.selectedIndex + 1).toString());

				if(input !== null && input.el !== null)
					input.el.attr('data-parsley-required', 'true');	
					
				input.el.parent().show();
			};
		})(this));

		this.form.submit((function(_this){
			return function(evt){
				evt.preventDefault();
				var itsValid = _this.form.parsley().isValid();
				
				if (!itsValid){
					_this.form.parsley().validate();
				} else {
					_this.successMessage.toggleClass('hidden', false);
				}	
			};
		})(this));	
	};

	ValidateController.prototype.startup = function(){
		this.setComponents();

		var firstFullname = this.fullnameComponents[0];
		firstFullname.el.attr('data-parsley-required', 'true');
		firstFullname.el.parent().show();
	};

	ValidateController.prototype.findFullnameById = function(id){
		for (var i = 0; i < this.fullnameComponents.length; i++){
			var element = this.fullnameComponents[i];

			if (element.id === id)
				return element;
		}

		return null;
	};

	return ValidateController;
})();
