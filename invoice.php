<?php
// Invoice Generator 
?>

<html>
	<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="invoice.js"></script>
	<script>
		
	</script>
	</head>
<body>
<form name="invoiceGenarator" id="invoiceGenarator" method="POST" action="printInvoice.php">
	<div class="wrapper" style="width: 60%; margin: auto;">
		<div style="text-align: right;margin-bottom: 23px;margin-top: 24px;">
			<button type="button" onclick="submitForm()">Generate Invoice</button>
			<button type="button" class="add-item"> Add Item</button>
			<input type="hidden" name="hidLength" id="hidLength" value="0">
		</div>
		<div>
			<table class="invoice-table" style="float: right;">
				<tr class="header">
					<td>
						<label>
							Name
						</label>
					</td>
					<td>
						<label>
							Quantity
						</label>
					</td>
					<td>
						<label>
							Unit Price
						</label>
					</td>
					<td>
						<label>
							Tax
						</label>
					</td>
					<td>
						<label>
							Total
						</label>
					</td>
				</tr>
				<tr class="body cls-item-set" data-index="1" id="itemSet_1">
					<td>
						<div>
							<input class="txtName" name="txtName-1" id="txtName-1" value="">
						</div>
					</td>
					<td>
						<div>
							<input class="txtQuantity" name="txtQuantity-1" id="txtQuantity-1" onchange="calculateLineTotal(this)" value="">
						</div>
					</td>
					<td>
						<div>
							<input class="txtUnitPrice" name="txtUnitPrice-1" id="txtUnitPrice-1" onchange="calculateLineTotal(this)" value="">
						</div>
					</td>
					<td>
						<div>
							<select class="slctTax" name="slctTax-1" id="slctTax-1" onchange="calculateLineTotal(this)">
								<option value="0">0 %</option>
								<option value="1">1 %</option>
								<option value="5">5 %</option>
								<option value="10">10 %</option>
							</select>
						</div>
					</td>
					<td>
						<div class="divLineTotal" id="divLineTotal-1">
							0
						</div>
						<input type="hidden" name="hidLineTotal-1" class="hidLineTotal" id="hidLineTotal-1" value="0">
						<input type="hidden" name="hidLineTotalWOTax-1" class="hidLineTotalWOTax" id="hidLineTotalWOTax-1" value="0">
					</td>
					<td>
						<button type="button" class="rmvRow">-</button>
					</td>
				</tr>
				<tr>
					<td colspan="1">&nbsp</td>
					<td colspan="3">
						<div>
							<label>Discount Type</label>
							<select name="slctDiscountType" id="slctDiscountType" onchange="calculateSubTotal()">
								<option value="amount">Amount</option>
								<option value="percentage">Percentage</option>
							</select>
							<label>value</label>
							<input type="text" name="txtdiscount" id="txtdiscount" value="0" onchange="calculateSubTotal()">
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">&nbsp</td>
					<td colspan="2">
						<div>
							<label>Sub Total (with out tax):</label><span id="spanSubTotalWOT"> 0</span>
							<input type="hidden" name="hidSubTotalWOT" class="hidSubTotalWOT" id="hidSubTotalWOT" value="0">
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">&nbsp</td>
					<td colspan="2">
						<div>
							<label>Sub Total (with tax): </label><span id="spanSubTotalWT"> 0</span>
							<input type="hidden" name="hidSubTotalWT" class="hidSubTotalWT" id="hidSubTotalWT" value="0">
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">&nbsp</td>
					<td colspan="2">
						<div>
							<label> Total: </label><span id="spanTotal"> 0</span>
							<input type="hidden" name="hidTotal" class="hidTotal" id="hidTotal" value="0">
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>
</body>
</html>