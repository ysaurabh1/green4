import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { CreditCard, Wallet, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import type { Product } from '../App';

interface PurchaseModalProps {
  product: Product;
  onClose: () => void;
  onPurchase: (product: Product, paymentMethod: string) => void;
  userWalletBalance: number;
}

export function PurchaseModal({ product, onClose, onPurchase, userWalletBalance }: PurchaseModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('wallet');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = product.basePrice + product.carbonTax;
  const canAfford = userWalletBalance >= totalPrice;

  const handlePurchase = async () => {
    if (paymentMethod === 'wallet' && !canAfford) {
      toast.error('Insufficient wallet balance');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onPurchase(product, paymentMethod === 'wallet' ? 'Token Wallet' : 'INR');
      setIsProcessing(false);
      toast.success(`Successfully purchased ${product.name}!`);
    }, 1500);
  };

  return (
    <Dialog open={true} onOpenChange={() => !isProcessing && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Purchase Confirmation</DialogTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              disabled={isProcessing}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Review your purchase details and select a payment method to complete your order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex space-x-4">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-1">
              <h3 className="text-gray-900">{product.name}</h3>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="text-gray-900">Price Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price:</span>
                <span className="text-gray-900">₹{product.basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Carbon Tax:</span>
                <span className="text-orange-600">₹{product.carbonTax.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-900">Total Amount:</span>
                <span className="text-green-600">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-4">
            <h4 className="text-gray-900">Payment Method</h4>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex-1 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    <span>Token Wallet</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-900">₹{userWalletBalance.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Available</div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="inr" id="inr" />
                <Label htmlFor="inr" className="flex-1 flex items-center space-x-3 cursor-pointer">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span>Pay with INR</span>
                </Label>
              </div>
            </RadioGroup>
            
            {paymentMethod === 'wallet' && !canAfford && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                Insufficient wallet balance. Please add funds or choose INR payment.
              </div>
            )}
          </div>

          {/* Environmental Impact */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-green-800 mb-2">Environmental Impact</h4>
            <p className="text-sm text-green-700">
              Your ₹{product.carbonTax.toLocaleString()} carbon tax will directly fund 
              reforestation and renewable energy projects.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose} 
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePurchase} 
              disabled={isProcessing || (paymentMethod === 'wallet' && !canAfford)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {isProcessing ? 'Processing...' : 'Confirm Purchase'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}