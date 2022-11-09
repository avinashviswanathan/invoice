// For adding new item
		$(document).on('click', '.add-item', function() {
			var element = document.getElementsByClassName("cls-item-set");
			var id = $(this).closest('.wrapper').find('.cls-item-set:last').data('index');
			var newId = parseInt(id) + 1;
			var cloneSection = $(this).closest('.wrapper').find('.cls-item-set:last').clone();
			var insertSection = $(this).closest('.wrapper').find('.cls-item-set:last');
			cloneSection.prop('id', 'itemSet_' + newId);
			cloneSection.attr('data-index', newId);
			cloneSection.find('.txtName').prop('name', 'txtName-' + newId);
			cloneSection.find('.txtName').prop('id', 'txtName-' + newId);
			cloneSection.find('.txtName').prop('value', '');
			cloneSection.find('.txtQuantity').prop('name', 'txtQuantity-' + newId);
			cloneSection.find('.txtQuantity').prop('id', 'txtQuantity-' + newId);
			cloneSection.find('.txtQuantity').prop('value', '');
			cloneSection.find('.txtUnitPrice').prop('name', 'txtUnitPrice-' + newId);
			cloneSection.find('.txtUnitPrice').prop('id', 'txtUnitPrice-' + newId);
			cloneSection.find('.txtUnitPrice').prop('value', '');
			cloneSection.find('.slctTax').prop('name', 'slctTax-' + newId);
			cloneSection.find('.slctTax').prop('id', 'slctTax-' + newId);
			cloneSection.find('.slctTax').prop('value', '0');
			cloneSection.find('.divLineTotal').prop('id', 'divLineTotal-' + newId);
			cloneSection.find('.divLineTotal').html('0');
			cloneSection.find('.hidLineTotal').prop('name', 'hidLineTotal-' + newId);
			cloneSection.find('.hidLineTotal').prop('id', 'hidLineTotal-' + newId);
			cloneSection.find('.hidLineTotal').prop('value', '0');
			cloneSection.find('.hidLineTotalWOTax').prop('name', 'hidLineTotalWOTax-' + newId);
			cloneSection.find('.hidLineTotalWOTax').prop('id', 'hidLineTotalWOTax-' + newId);
			cloneSection.find('.hidLineTotalWOTax').prop('value', '0');
			insertSection.after(cloneSection);
		});

		// For deleting the item
		$(document).on('click', '.rmvRow', function() {
			var element = document.getElementsByClassName("cls-item-set");
			var id = $(this).closest('.cls-item-set').data('index');
			$('#itemSet_' + id).remove();
			calculateSubTotal();
		});

		// Function to calculate line item
		function calculateLineTotal(element) {
			var lineTotal = 0;
			var lineTotalWithOutTax = 0;
			var id = element.getAttribute('id').split('-')[1];           
            if (isNaN(element.value)) {
                element.value = 0;
                alert('Please provide a valid input');
                return false;
              }
			var quantinty = document.getElementById('txtQuantity-' + id).value;
			var unitPrice = document.getElementById('txtUnitPrice-' + id).value;
			var tax = document.getElementById('slctTax-' + id).value;
			if (quantinty != '') {
				quantinty = parseInt(quantinty);
			} else {
				quantinty = 0;
			}
			if (unitPrice != '') {
				unitPrice = parseFloat(unitPrice);
			} else {
				unitPrice = 0;
			}
			lineTotalWithOutTax = unitPrice * quantinty;
			var lineTax = (lineTotalWithOutTax * tax) / 100;
			lineTotal = lineTotalWithOutTax + lineTax;
			document.getElementById('divLineTotal-' + id).innerHTML = lineTotal;
			document.getElementById('hidLineTotal-' + id).value = lineTotal;
			document.getElementById('hidLineTotalWOTax-' + id).value = lineTotalWithOutTax;
			calculateSubTotal();
		}

		// Function to calculate Subtotal 
		function calculateSubTotal(){
			var subTotalWithTax = 0;
			var lineSubTotalWithTax = 0;
			var subTotalWithOutTax = 0;
			var lineSubTotalWithOutTax = 0;
			var id = '';
			$('.invoice-table').find('.cls-item-set').each(function(){
				id = $(this).data('index');
				if(document.getElementById("hidLineTotal-"+id)){
					lineSubTotalWithTax = lineSubTotalWithTax + parseFloat(document.getElementById("hidLineTotal-"+id).value);
				}
				if(document.getElementById("hidLineTotalWOTax-"+id)){
					lineSubTotalWithOutTax = lineSubTotalWithOutTax + parseFloat(document.getElementById("hidLineTotalWOTax-"+id).value);
				}
			});
			subTotalWithTax = lineSubTotalWithTax;
			subTotalWithOutTax = lineSubTotalWithOutTax;
			
			if(document.getElementById("spanSubTotalWT")){
				document.getElementById("spanSubTotalWT").innerHTML = subTotalWithTax;
				document.getElementById("hidSubTotalWT").value = subTotalWithTax;
			}
			if(document.getElementById("spanSubTotalWOT")){
				document.getElementById("spanSubTotalWOT").innerHTML = subTotalWithOutTax;
				document.getElementById("hidSubTotalWOT").value = subTotalWithOutTax;

			}
			calculateTotal(subTotalWithTax);
		}

		// Function to calculate total 
		function calculateTotal(subTotalWithTax){
			var total = 0;
			if(document.getElementById("slctDiscountType") && document.getElementById("txtdiscount")){
				var type = document.getElementById("slctDiscountType").value;
				subTotalWithTax = parseFloat(subTotalWithTax);
				var discount = document.getElementById("txtdiscount").value;
				if(type == 'amount'){
					console.log(subTotalWithTax);
					console.log(discount);
					total = subTotalWithTax - discount;
					console.log(type);
				}
				else{
					total = subTotalWithTax - ((subTotalWithTax * discount )/100);
				}
			}
			if(document.getElementById("spanTotal")){
				document.getElementById("spanTotal").innerHTML = total;
				document.getElementById("hidTotal").value = total;
			}
			
		}

		// Function for submitting the form 
		function submitForm(){
			var objForm = document.getElementById('invoiceGenarator');
			var id = $('.wrapper').find('.cls-item-set:last').data('index');
			if(document.getElementById("hidLength")){
				document.getElementById("hidLength").value = id;
			}
            var flagSubmit = 1;
            $('.invoice-table').find('.cls-item-set').each(function(){
				id = $(this).data('index');
				if(document.getElementById("txtName-"+id)){
					if(document.getElementById("txtName-"+id).value =='' && flagSubmit){
                        flagSubmit = 0;
                    }
				}
				
			});
            if(flagSubmit){
                objForm.submit();
            }
            else{
                alert("Please make sure that all item  are entered.")
            }
			
		}