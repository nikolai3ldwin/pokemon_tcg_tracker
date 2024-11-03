import React, { useState, useEffect } from 'react';
import { Camera, Upload, Edit2, DollarSign, TrendingUp, BarChart2, Heart, ShoppingBag, Image, ShoppingCart, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PokemonCardTracker = () => {
  const [activeTab, setActiveTab] = useState("collection");
  const [userCards, setUserCards] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);

  // Mock prediction data generator
  const generatePredictions = (basePrice, condition) => {
    const qualityMultiplier = {
      'Mint': 1.0,
      'Near Mint': 0.85,
      'Excellent': 0.7,
      'Good': 0.5,
      'Poor': 0.3
    };
    const multiplier = qualityMultiplier[condition];
    
    return {
      oneYear: basePrice * multiplier * 1.1,
      threeYear: basePrice * multiplier * 1.3,
      fiveYear: basePrice * multiplier * 1.5,
      tenYear: basePrice * multiplier * 2.0,
      twentyYear: basePrice * multiplier * 3.0
    };
  };

  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    console.log('Accessing camera...');
  };

  const renderPredictionChart = (card) => {
    const predictions = generatePredictions(card.currentPrice, card.condition);
    const predictionData = [
      { year: 'Now', price: card.currentPrice },
      { year: '1Y', price: predictions.oneYear },
      { year: '3Y', price: predictions.threeYear },
      { year: '5Y', price: predictions.fiveYear },
      { year: '10Y', price: predictions.tenYear },
      { year: '20Y', price: predictions.twentyYear },
    ];

    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#8884d8" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pokemon Card Tracker</h1>
        <p className="text-gray-600">Track, manage, and trade your Pokemon card collection</p>
      </header>

      <Tabs defaultValue="collection" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="collection">Collection</TabsTrigger>
          <TabsTrigger value="analysis">Value Analysis</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
        </TabsList>

        {/* Collection Tab */}
        <TabsContent value="collection">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Mobile Camera
                </CardTitle>
              </CardHeader>
              <CardContent>
                <button 
                  onClick={handleCameraCapture}
                  className="w-full p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center"
                >
                  <Camera className="w-8 h-8 mb-2 text-gray-400" />
                  <span>Take Photo</span>
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex flex-col items-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <span className="text-sm text-gray-500">Upload card photos</span>
                  <input type="file" className="hidden" accept="image/*" multiple />
                </label>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit2 className="w-5 h-5" />
                  Manual Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <button 
                  className="w-full p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => setShowAddCard(true)}
                >
                  Add card manually
                </button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userCards.map((card) => (
              <Card key={card.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <h3 className="font-bold mb-2">{card.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Set: {card.set}</span>
                    <span className="text-sm">Condition: {card.condition}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600">${card.currentPrice}</span>
                    <div className="space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Value Analysis Tab */}
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 gap-6">
            {userCards.map((card) => (
              <Card key={card.id} className="w-full">
                <CardHeader>
                  <CardTitle>{card.name}</CardTitle>
                  <CardDescription>Current Value: ${card.currentPrice} | Condition: {card.condition}</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderPredictionChart(card)}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    {Object.entries(generatePredictions(card.currentPrice, card.condition)).map(([period, value]) => (
                      <div key={period} className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">{period}</div>
                        <div className="font-bold">${value.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for cards to add to wishlist..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wishlist.map((card) => (
              <Card key={card.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <h3 className="font-bold mb-2">{card.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600">${card.targetPrice}</span>
                    <button className="text-red-500 hover:text-red-600">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Market Tab */}
        <TabsContent value="market">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userCards.filter(card => card.forSale).map((card) => (
                    <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={card.image} 
                          alt={card.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium">{card.name}</h4>
                          <p className="text-sm text-gray-600">Listed for ${card.askingPrice}</p>
                        </div>
                      </div>
                      <button className="text-red-500 hover:text-red-600">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trade Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Trade requests would be mapped here */}
                  <div className="p-4 text-center text-gray-500">
                    No active trade requests
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Card Dialog */}
      <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
            <DialogDescription>
              Enter the card details manually
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Card Name</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Set</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Condition</label>
              <select className="w-full p-2 border rounded">
                <option value="Mint">Mint</option>
                <option value="Near Mint">Near Mint</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Current Price ($)</label>
              <input 
                type="number" 
                step="0.01" 
                className="w-full p-2 border rounded"
              />
            </div>
            <button 
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Card
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PokemonCardTracker;
