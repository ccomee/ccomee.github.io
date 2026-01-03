import os
from PIL import Image

def get_gradient_stops(image_path, num_samples=20):
    try:
        img = Image.open(image_path)
        img = img.convert('RGB')
        width, height = img.size
        
        # Sample the middle row
        y = height // 2
        
        stops = []
        for i in range(num_samples):
            # Calculate x position (0 to width-1)
            x = int((i / (num_samples - 1)) * (width - 1))
            r, g, b = img.getpixel((x, y))
            stops.append(f"rgb({r}, {g}, {b})")
            
        return stops
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return []

def main():
    base_dir = r"c:\Users\comec\maman_chercheuse\design"
    image_files = [
        "Gradients p1.png",
        "Gradients p2.png",
        "Gradients p3.png",
        "Gradients p4.png"
    ]
    
    all_stops = []
    
    # We want to create one continuous gradient that is 400% wide.
    # Page 1 is 0-25%, Page 2 is 25-50%, etc.
    # We will sample each image and map it to its percentage range in the global gradient.
    
    total_images = len(image_files)
    samples_per_image = 25 # Enough resolution to capture non-linearities
    
    print("const gradientColors = `linear-gradient(to right,")
    
    global_stops = []
    
    for idx, filename in enumerate(image_files):
        path = os.path.join(base_dir, filename)
        stops = get_gradient_stops(path, samples_per_image)
        
        if not stops:
            print(f"Failed to get stops for {filename}")
            return

        # Map local sample index to global percentage
        # Image covers 100/total_images percent of the width
        segment_width = 100.0 / total_images
        
        # Add a tiny buffer to inner boundaries to prevent bleeding
        # e.g. instead of 0-25, do 0.02 - 24.98
        buffer = 0.02
        
        start_global = (idx * segment_width) + buffer
        end_global = ((idx + 1) * segment_width) - buffer
        
        # For the very first and very last, we might want to keep 0 and 100 exactly?
        # Safe to keep buffer everywhere if background-color is handled, but let's clamp edges.
        if idx == 0:
            start_global = 0.0
        if idx == total_images - 1:
            end_global = 100.0

        current_width = end_global - start_global

        for i, color in enumerate(stops):
            # purely local percent 0..1
            local_ratio = i / (samples_per_image - 1)
            
            # global percent
            global_percent = start_global + (local_ratio * current_width)
            
            global_stops.append(f"  {color} {global_percent:.2f}%")

    print(",\n".join(global_stops))
    print(");`")

if __name__ == "__main__":
    main()
